'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Upload, Trash2, Edit2, Plus, X, Check, Image as ImageIcon, Camera } from 'lucide-react';

// ─── Single Image Uploader ────────────────────────────────────────────────────
function ImageUploader({
  currentUrl,
  onUpload,
  folder = 'portfolio',
  label = 'Upload Image',
}: {
  currentUrl?: string;
  onUpload: (url: string) => void;
  folder?: string;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || '');
  const [error, setError] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setPreview(currentUrl || ''); }, [currentUrl]);

  const handleFile = async (file: File) => {
    setUploading(true); setError('');
    const fd = new FormData();
    fd.append('file', file); fd.append('folder', folder);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setPreview(data.url); onUpload(data.url);
    } catch (e: any) { setError(e.message); } finally { setUploading(false); }
  };

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); };
  const applyUrl = () => { if (urlInput.trim()) { setPreview(urlInput.trim()); onUpload(urlInput.trim()); setUrlInput(''); } };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode('upload')} className={`px-3 py-1.5 rounded border text-xs uppercase tracking-wider transition-colors ${mode === 'upload' ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-foreground'}`}>Upload File</button>
        <button type="button" onClick={() => setMode('url')} className={`px-3 py-1.5 rounded border text-xs uppercase tracking-wider transition-colors ${mode === 'url' ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-foreground'}`}>Paste URL</button>
      </div>
      {mode === 'upload' ? (
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-foreground transition-colors">
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground"><div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" /><span className="text-xs">Uploading…</span></div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground"><Upload size={20} /><span className="text-xs">{label} — drag & drop or click</span><span className="text-xs opacity-60">JPEG, PNG, WebP · max 10MB</span></div>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input type="text" placeholder="https://example.com/image.jpg" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && applyUrl()} className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm text-foreground placeholder:text-muted-foreground" />
          <button type="button" onClick={applyUrl} className="px-3 py-2 bg-foreground text-background rounded text-xs uppercase tracking-wider hover:bg-foreground/90">Use</button>
        </div>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
      {preview && (
        <div className="relative w-full h-40 rounded overflow-hidden border border-border">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button type="button" onClick={() => { setPreview(''); onUpload(''); }} className="absolute top-2 right-2 p-1 bg-background/80 rounded hover:bg-background"><X size={14} /></button>
        </div>
      )}
    </div>
  );
}

// ─── Multi Image Uploader ─────────────────────────────────────────────────────
function MultiImageUploader({
  folder = 'portfolio',
  onBatchSave,
  category,
}: {
  folder?: string;
  onBatchSave: (images: { image_url: string; title: string; category: string; order_num: number }[]) => void;
  category: string;
}) {
  const [files, setFiles] = useState<{ file: File; preview: string; title: string; url?: string; status: 'pending' | 'uploading' | 'done' | 'error' }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: FileList) => {
    const added = Array.from(newFiles).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      status: 'pending' as const,
    }));
    setFiles((prev) => [...prev, ...added]);
  };

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));
  const updateTitle = (idx: number, title: string) => setFiles((prev) => prev.map((f, i) => i === idx ? { ...f, title } : f));

  const uploadAll = async () => {
    setUploading(true); setError('');
    const updated = [...files];
    for (let i = 0; i < updated.length; i++) {
      if (updated[i].status === 'done') continue;
      updated[i] = { ...updated[i], status: 'uploading' };
      setFiles([...updated]);
      try {
        const fd = new FormData();
        fd.append('file', updated[i].file);
        fd.append('folder', folder);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        updated[i] = { ...updated[i], url: data.url, status: 'done' };
      } catch (e: any) {
        updated[i] = { ...updated[i], status: 'error' };
        setError(`Failed to upload ${updated[i].file.name}: ${e.message}`);
      }
      setFiles([...updated]);
    }
    setUploading(false);
    const done = updated.filter((f) => f.status === 'done' && f.url);
    if (done.length > 0) {
      onBatchSave(done.map((f, i) => ({ image_url: f.url!, title: f.title, category, order_num: i })));
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-foreground transition-colors"
      >
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files) addFiles(e.target.files); }} />
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Upload size={24} />
          <span className="text-sm font-medium">Drop multiple images here or click to select</span>
          <span className="text-xs opacity-60">JPEG, PNG, WebP · max 10MB each · multiple files supported</span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{files.length} image{files.length > 1 ? 's' : ''} selected</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {files.map((f, i) => (
              <div key={i} className={`relative border rounded-lg overflow-hidden ${f.status === 'done' ? 'border-green-500' : f.status === 'error' ? 'border-destructive' : 'border-border'}`}>
                <img src={f.preview} alt={f.title} className="w-full h-32 object-cover" />
                {f.status === 'uploading' && (
                  <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {f.status === 'done' && (
                  <div className="absolute top-2 left-2 bg-green-500 rounded-full p-0.5"><Check size={12} className="text-white" /></div>
                )}
                {f.status !== 'uploading' && (
                  <button onClick={() => removeFile(i)} className="absolute top-2 right-2 p-1 bg-background/80 rounded hover:bg-background"><X size={12} /></button>
                )}
                <div className="p-2">
                  <input
                    type="text"
                    value={f.title}
                    onChange={(e) => updateTitle(i, e.target.value)}
                    placeholder="Image title"
                    className="w-full text-xs px-2 py-1 bg-background border border-border rounded text-foreground"
                  />
                </div>
              </div>
            ))}
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            onClick={uploadAll}
            disabled={uploading || files.every(f => f.status === 'done')}
            className="w-full py-2.5 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-semibold hover:bg-foreground/90 disabled:opacity-50 transition-colors rounded"
          >
            {uploading ? 'Uploading…' : files.every(f => f.status === 'done') ? '✓ All Uploaded' : `Upload ${files.filter(f => f.status !== 'done').length} Image${files.filter(f => f.status !== 'done').length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('images');
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [photographer, setPhotographer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({});
  const [showForm, setShowForm] = useState(false);
  const [showMultiUpload, setShowMultiUpload] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [aboutImage, setAboutImage] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (!session) { router.push('/admin/login'); return; }
    try {
      const adminData = JSON.parse(session);
      setAdmin(adminData);
      loadData(adminData.photographer.id);
    } catch { router.push('/admin/login'); }
  }, [router]);

  useEffect(() => {
    if (photographer) {
      setHeroImage(photographer.hero_image_url || '');
      setAboutImage(photographer.about_image_url || '');
    }
  }, [photographer]);

  const loadData = async (photographerId: string) => {
    setLoading(true);
    try {
      const [portfolioRes, servicesRes, testimonialsRes, contactsRes, photographerRes] = await Promise.all([
        fetch(`/api/admin/portfolio?photographer_id=${photographerId}`),
        fetch(`/api/admin/services?photographer_id=${photographerId}`),
        fetch(`/api/admin/testimonials?photographer_id=${photographerId}`),
        fetch('/api/admin/contacts?limit=20'),
        fetch(`/api/admin/photographer?photographer_id=${photographerId}`),
      ]);
      setPortfolioItems((await portfolioRes.json()).images || []);
      setServices((await servicesRes.json()).services || []);
      setTestimonials((await testimonialsRes.json()).testimonials || []);
      setContacts((await contactsRes.json()).contacts || []);
      setPhotographer((await photographerRes.json()).photographer || null);
    } catch (e) { console.error('Error loading data:', e); } finally { setLoading(false); }
  };

  const showSave = (msg = 'Saved!') => { setSaveMsg(msg); setTimeout(() => setSaveMsg(''), 3000); };

  const handleLogout = () => { localStorage.removeItem('admin_session'); router.push('/admin/login'); };

  const handleSinglePortfolioImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) return alert('Please upload or enter an image URL.');
    setSaving(true);
    try {
      const payload = { photographer_id: admin.photographer.id, title: formData.title || 'Untitled', description: formData.description || '', image_url: formData.image_url, category: formData.category || '', order_num: formData.order_num || 0 };
      const res = await fetch('/api/admin/portfolio', { method: editingId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload) });
      if (res.ok) { setFormData({}); setShowForm(false); setEditingId(null); showSave('Image saved!'); loadData(admin.photographer.id); }
    } finally { setSaving(false); }
  };

  const handleBatchSave = async (images: { image_url: string; title: string; category: string; order_num: number }[]) => {
    setSaving(true);
    try {
      const results = await Promise.all(
        images.map((img) =>
          fetch('/api/admin/portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ photographer_id: admin.photographer.id, ...img }),
          })
        )
      );
      const saved = results.filter((r) => r.ok).length;
      showSave(`${saved} image${saved > 1 ? 's' : ''} saved!`);
      setShowMultiUpload(false);
      loadData(admin.photographer.id);
    } finally { setSaving(false); }
  };

  const handleDeletePortfolioImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`/api/admin/portfolio?id=${id}`, { method: 'DELETE' });
    loadData(admin.photographer.id);
  };

  const startEdit = (item: any) => { setFormData({ ...item }); setEditingId(item.id); setShowForm(true); setShowMultiUpload(false); };

  const saveSiteImages = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/photographer', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: admin.photographer.id, hero_image_url: heroImage, about_image_url: aboutImage }) });
      if (res.ok) showSave('Site images updated!');
    } finally { setSaving(false); }
  };

  const handleMarkContactAsRead = async (id: string, isRead: boolean) => {
    await fetch('/api/admin/contacts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, is_read: !isRead }) });
    loadData(admin.photographer.id);
  };

  const tabs = [
    { id: 'images', label: 'Site Images' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contacts', label: 'Contacts' },
  ];

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center"><Camera size={16} className="text-background" /></div>
            <div><h1 className="text-sm font-bold uppercase tracking-widest">Admin</h1><p className="text-xs text-muted-foreground">{admin?.email}</p></div>
          </div>
          <div className="flex items-center gap-3">
            {saveMsg && <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 px-3 py-1.5 rounded border border-green-200 dark:border-green-800"><Check size={12} /> {saveMsg}</span>}
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-border rounded hover:border-foreground transition-colors uppercase tracking-wider"><LogOut size={14} /> Logout</button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-4 text-xs uppercase tracking-[0.15em] border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-foreground text-foreground font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
              {tab.label}
              {tab.id === 'contacts' && contacts.filter((c) => !c.is_read).length > 0 && <span className="ml-2 bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded-full">{contacts.filter((c) => !c.is_read).length}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* SITE IMAGES */}
        {activeTab === 'images' && (
          <div className="space-y-8 max-w-2xl">
            <div><h2 className="text-xl font-bold mb-1">Site Images</h2><p className="text-sm text-muted-foreground">Control the main images shown on your public website.</p></div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <label className="text-sm font-semibold uppercase tracking-wider block mb-1">Hero Section Image</label>
                <p className="text-xs text-muted-foreground mb-3">The large portrait shown in the homepage hero.</p>
                <ImageUploader currentUrl={heroImage} onUpload={(url) => setHeroImage(url)} folder="hero" label="Upload Hero Image" />
              </div>
              <div className="border-t border-border pt-6">
                <label className="text-sm font-semibold uppercase tracking-wider block mb-1">About Section Image</label>
                <p className="text-xs text-muted-foreground mb-3">The image shown in the About Me section.</p>
                <ImageUploader currentUrl={aboutImage} onUpload={(url) => setAboutImage(url)} folder="about" label="Upload About Image" />
              </div>
              <button onClick={saveSiteImages} disabled={saving} className="w-full py-3 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-semibold hover:bg-foreground/90 disabled:opacity-50 transition-colors rounded">
                {saving ? 'Saving…' : 'Save Site Images'}
              </button>
            </div>
          </div>
        )}

        {/* PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <div><h2 className="text-xl font-bold">Portfolio Images</h2><p className="text-sm text-muted-foreground">{portfolioItems.length} images</p></div>
              <div className="flex gap-2">
                <button onClick={() => { setShowMultiUpload(!showMultiUpload); setShowForm(false); setEditingId(null); setFormData({}); }} className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs uppercase tracking-wider rounded hover:bg-foreground/90 transition-colors">
                  <Upload size={15} /> Bulk Upload
                </button>
                <button onClick={() => { setShowForm(!showForm); setShowMultiUpload(false); setFormData({}); setEditingId(null); }} className="flex items-center gap-2 px-4 py-2 border border-foreground text-foreground text-xs uppercase tracking-wider rounded hover:bg-foreground hover:text-background transition-colors">
                  <Plus size={15} /> Add One
                </button>
              </div>
            </div>

            {/* Multi Upload Form */}
            {showMultiUpload && (
              <div className="bg-card border border-border p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Bulk Upload Images</h3>
                  <button onClick={() => setShowMultiUpload(false)}><X size={16} className="text-muted-foreground" /></button>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Category for all images</label>
                  <input type="text" placeholder="e.g. landscape, portrait, wedding" value={formData.category || ''} onChange={(e) => setFormData((f: any) => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground mb-4" />
                </div>
                <MultiImageUploader folder={formData.category || 'portfolio'} category={formData.category || ''} onBatchSave={handleBatchSave} />
              </div>
            )}

            {/* Single Image Form */}
            {showForm && (
              <div className="bg-card border border-border p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider">{editingId ? 'Edit Image' : 'New Portfolio Image'}</h3>
                <ImageUploader currentUrl={formData.image_url} onUpload={(url) => setFormData((f: any) => ({ ...f, image_url: url }))} folder="portfolio" label="Upload Portfolio Image" />
                <input type="text" placeholder="Title" value={formData.title || ''} onChange={(e) => setFormData((f: any) => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground" />
                <input type="text" placeholder="Category (e.g. wedding, portrait, landscape)" value={formData.category || ''} onChange={(e) => setFormData((f: any) => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground" />
                <textarea placeholder="Description (optional)" value={formData.description || ''} onChange={(e) => setFormData((f: any) => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground resize-none" />
                <input type="number" placeholder="Order (lower = first)" value={formData.order_num ?? ''} onChange={(e) => setFormData((f: any) => ({ ...f, order_num: parseInt(e.target.value) || 0 }))} className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground" />
                <div className="flex gap-3">
                  <button onClick={handleSinglePortfolioImage} disabled={saving} className="flex-1 py-2 bg-foreground text-background text-xs uppercase tracking-wider rounded hover:bg-foreground/90 disabled:opacity-50">{saving ? 'Saving…' : editingId ? 'Update Image' : 'Add Image'}</button>
                  <button type="button" onClick={() => { setShowForm(false); setFormData({}); setEditingId(null); }} className="px-4 py-2 bg-muted text-muted-foreground text-xs uppercase tracking-wider rounded hover:bg-muted/80">Cancel</button>
                </div>
              </div>
            )}

            {portfolioItems.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-lg">
                <Camera size={32} className="mx-auto mb-4 opacity-30" />
                <p className="text-sm">No portfolio images yet. Add your first one above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden group">
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button onClick={() => startEdit(item)} className="p-2 bg-background/90 rounded hover:bg-background text-foreground" title="Edit"><Edit2 size={15} /></button>
                        <button onClick={() => handleDeletePortfolioImage(item.id)} className="p-2 bg-destructive rounded hover:bg-destructive/90 text-white" title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-foreground truncate">{item.title}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Services</h2>
            {services.length === 0 ? <p className="text-muted-foreground text-sm py-8">No services found.</p> : (
              <div className="grid gap-4">
                {services.map((service) => (
                  <div key={service.id} className="bg-card border border-border p-4 rounded-lg flex justify-between items-start gap-4">
                    <div><h3 className="font-semibold">{service.title}</h3><p className="text-sm text-muted-foreground mt-1">{service.description}</p></div>
                    <span className={`text-xs px-2 py-1 rounded ${service.is_active ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' : 'bg-muted text-muted-foreground'}`}>{service.is_active ? 'Active' : 'Hidden'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Testimonials</h2>
            {testimonials.length === 0 ? <p className="text-muted-foreground text-sm py-8">No testimonials found.</p> : (
              <div className="grid gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-card border border-border p-4 rounded-lg">
                    <p className="text-sm italic">"{t.content}"</p>
                    <p className="font-semibold text-sm mt-2">{t.client_name}</p>
                    <p className="text-xs text-muted-foreground">{t.client_title}</p>
                    <div className="flex gap-0.5 mt-2">{Array(t.rating || 5).fill(0).map((_, i) => <span key={i} className="text-yellow-500 text-sm">★</span>)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Contact Submissions {contacts.filter((c) => !c.is_read).length > 0 && <span className="ml-2 text-sm font-normal text-muted-foreground">({contacts.filter((c) => !c.is_read).length} unread)</span>}</h2>
            {contacts.length === 0 ? <p className="text-muted-foreground text-sm py-8">No contact submissions yet.</p> : (
              <div className="grid gap-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className={`border border-border p-4 rounded-lg ${contact.is_read ? 'bg-card' : 'bg-primary/5 border-primary/20'}`}>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{contact.name}</h3>
                          {!contact.is_read && <span className="px-2 py-0.5 bg-foreground text-background text-xs rounded">New</span>}
                        </div>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        {contact.phone && <p className="text-sm text-muted-foreground">{contact.phone}</p>}
                        <p className="text-sm mt-2">{contact.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{new Date(contact.created_at).toLocaleDateString('en-KE', { dateStyle: 'medium' })}</p>
                      </div>
                      <button onClick={() => handleMarkContactAsRead(contact.id, contact.is_read)} className="px-3 py-1.5 bg-muted rounded hover:bg-muted/80 text-xs uppercase tracking-wider whitespace-nowrap">{contact.is_read ? 'Mark Unread' : 'Mark Read'}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
