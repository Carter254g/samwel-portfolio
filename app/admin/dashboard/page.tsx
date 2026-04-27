'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Upload, Trash2, Edit2, Plus, X, Check, Image as ImageIcon, User, Camera } from 'lucide-react';

// ─── Image Upload Component ───────────────────────────────────────────────────
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

  useEffect(() => {
    setPreview(currentUrl || '');
  }, [currentUrl]);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setPreview(data.url);
      onUpload(data.url);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const applyUrl = () => {
    if (urlInput.trim()) {
      setPreview(urlInput.trim());
      onUpload(urlInput.trim());
      setUrlInput('');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 text-xs">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`px-3 py-1.5 rounded border text-xs uppercase tracking-wider transition-colors ${mode === 'upload' ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-foreground'}`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1.5 rounded border text-xs uppercase tracking-wider transition-colors ${mode === 'url' ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-foreground'}`}
        >
          Paste URL
        </button>
      </div>

      {mode === 'upload' ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-foreground transition-colors"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span className="text-xs">Uploading…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload size={20} />
              <span className="text-xs">{label} — drag & drop or click</span>
              <span className="text-xs opacity-60">JPEG, PNG, WebP, GIF · max 10MB</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyUrl()}
            className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={applyUrl}
            className="px-3 py-2 bg-foreground text-background rounded text-xs uppercase tracking-wider hover:bg-foreground/90"
          >
            Use
          </button>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}

      {preview && (
        <div className="relative w-full h-40 rounded overflow-hidden border border-border">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => { setPreview(''); onUpload(''); }}
            className="absolute top-2 right-2 p-1 bg-background/80 rounded hover:bg-background"
          >
            <X size={14} />
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (!session) { router.push('/admin/login'); return; }
    try {
      const adminData = JSON.parse(session);
      setAdmin(adminData);
      loadData(adminData.photographer.id);
    } catch {
      router.push('/admin/login');
    }
  }, [router]);

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
    } catch (e) {
      console.error('Error loading data:', e);
    } finally {
      setLoading(false);
    }
  };

  const showSave = (msg = 'Saved!') => {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/admin/login');
  };

  // ── Portfolio ──
  const handleAddPortfolioImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) return alert('Please upload or enter an image URL.');
    setSaving(true);
    try {
      const payload = {
        photographer_id: admin.photographer.id,
        title: formData.title || 'Untitled',
        description: formData.description || '',
        image_url: formData.image_url,
        category: formData.category || '',
        order_num: formData.order_num || 0,
      };
      const res = await fetch('/api/admin/portfolio', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload),
      });
      if (res.ok) {
        setFormData({});
        setShowForm(false);
        setEditingId(null);
        showSave('Image saved!');
        loadData(admin.photographer.id);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePortfolioImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`/api/admin/portfolio?id=${id}`, { method: 'DELETE' });
    loadData(admin.photographer.id);
  };

  const startEdit = (item: any) => {
    setFormData({ ...item });
    setEditingId(item.id);
    setShowForm(true);
  };

  // ── Site Images (Hero / About) ──
  const [heroImage, setHeroImage] = useState('');
  const [aboutImage, setAboutImage] = useState('');

  useEffect(() => {
    if (photographer) {
      setHeroImage(photographer.hero_image_url || '');
      setAboutImage(photographer.about_image_url || '');
    }
  }, [photographer]);

  const saveSiteImages = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/photographer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: admin.photographer.id,
          hero_image_url: heroImage,
          about_image_url: aboutImage,
        }),
      });
      if (res.ok) showSave('Site images updated!');
    } finally {
      setSaving(false);
    }
  };

  // ── Contacts ──
  const handleMarkContactAsRead = async (id: string, isRead: boolean) => {
    await fetch('/api/admin/contacts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_read: !isRead }),
    });
    loadData(admin.photographer.id);
  };

  const tabs = [
    { id: 'images', label: 'Site Images', icon: ImageIcon },
    { id: 'portfolio', label: 'Portfolio', icon: Camera },
    { id: 'services', label: 'Services', icon: null },
    { id: 'testimonials', label: 'Testimonials', icon: null },
    { id: 'contacts', label: 'Contacts', icon: null },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center">
              <Camera size={16} className="text-background" />
            </div>
            <div>
              <h1 className="text-sm font-bold uppercase tracking-widest">Admin</h1>
              <p className="text-xs text-muted-foreground">{admin?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saveMsg && (
              <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 px-3 py-1.5 rounded border border-green-200 dark:border-green-800">
                <Check size={12} /> {saveMsg}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-border rounded hover:border-foreground transition-colors uppercase tracking-wider"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-4 text-xs uppercase tracking-[0.15em] border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-foreground text-foreground font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              {tab.id === 'contacts' && contacts.filter((c) => !c.is_read).length > 0 && (
                <span className="ml-2 bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded-full">
                  {contacts.filter((c) => !c.is_read).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── SITE IMAGES TAB ── */}
        {activeTab === 'images' && (
          <div className="space-y-8 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold mb-1">Site Images</h2>
              <p className="text-sm text-muted-foreground">Control the main images shown on your public website.</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <label className="text-sm font-semibold uppercase tracking-wider block mb-3">
                  Hero Section Image
                </label>
                <p className="text-xs text-muted-foreground mb-3">The large portrait image shown in the homepage hero section.</p>
                <ImageUploader
                  currentUrl={heroImage}
                  onUpload={(url) => setHeroImage(url)}
                  folder="hero"
                  label="Upload Hero Image"
                />
              </div>

              <div className="border-t border-border pt-6">
                <label className="text-sm font-semibold uppercase tracking-wider block mb-3">
                  About Section Image
                </label>
                <p className="text-xs text-muted-foreground mb-3">The image shown in the About Me section.</p>
                <ImageUploader
                  currentUrl={aboutImage}
                  onUpload={(url) => setAboutImage(url)}
                  folder="about"
                  label="Upload About Image"
                />
              </div>

              <button
                onClick={saveSiteImages}
                disabled={saving}
                className="w-full py-3 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-semibold hover:bg-foreground/90 disabled:opacity-50 transition-colors rounded"
              >
                {saving ? 'Saving…' : 'Save Site Images'}
              </button>
            </div>
          </div>
        )}

        {/* ── PORTFOLIO TAB ── */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Portfolio Images</h2>
                <p className="text-sm text-muted-foreground">{portfolioItems.length} images — visible on the public site</p>
              </div>
              <button
                onClick={() => { setShowForm(!showForm); setFormData({}); setEditingId(null); }}
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs uppercase tracking-wider rounded hover:bg-foreground/90 transition-colors"
              >
                <Plus size={15} /> Add Image
              </button>
            </div>

            {showForm && (
              <div className="bg-card border border-border p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider">
                  {editingId ? 'Edit Image' : 'New Portfolio Image'}
                </h3>

                <ImageUploader
                  currentUrl={formData.image_url}
                  onUpload={(url) => setFormData((f: any) => ({ ...f, image_url: url }))}
                  folder="portfolio"
                  label="Upload Portfolio Image"
                />

                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData((f: any) => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground"
                />
                <input
                  type="text"
                  placeholder="Category (e.g. wedding, portrait, landscape)"
                  value={formData.category || ''}
                  onChange={(e) => setFormData((f: any) => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground"
                />
                <textarea
                  placeholder="Description (optional)"
                  value={formData.description || ''}
                  onChange={(e) => setFormData((f: any) => ({ ...f, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground resize-none"
                />
                <input
                  type="number"
                  placeholder="Order (lower = first)"
                  value={formData.order_num ?? ''}
                  onChange={(e) => setFormData((f: any) => ({ ...f, order_num: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground"
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleAddPortfolioImage}
                    disabled={saving}
                    className="flex-1 py-2 bg-foreground text-background text-xs uppercase tracking-wider rounded hover:bg-foreground/90 disabled:opacity-50"
                  >
                    {saving ? 'Saving…' : editingId ? 'Update Image' : 'Add Image'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setFormData({}); setEditingId(null); }}
                    className="px-4 py-2 bg-muted text-muted-foreground text-xs uppercase tracking-wider rounded hover:bg-muted/80"
                  >
                    Cancel
                  </button>
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
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => startEdit(item)}
                          className="p-2 bg-background/90 rounded hover:bg-background text-foreground"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeletePortfolioImage(item.id)}
                          className="p-2 bg-destructive rounded hover:bg-destructive/90 text-white"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
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

        {/* ── SERVICES TAB ── */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Services</h2>
            {services.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8">No services found in the database.</p>
            ) : (
              <div className="grid gap-4">
                {services.map((service) => (
                  <div key={service.id} className="bg-card border border-border p-4 rounded-lg flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-semibold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${service.is_active ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' : 'bg-muted text-muted-foreground'}`}>
                      {service.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TESTIMONIALS TAB ── */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Testimonials</h2>
            {testimonials.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8">No testimonials found in the database.</p>
            ) : (
              <div className="grid gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-card border border-border p-4 rounded-lg">
                    <p className="text-sm italic text-foreground">"{t.content}"</p>
                    <p className="font-semibold text-sm mt-2">{t.client_name}</p>
                    <p className="text-xs text-muted-foreground">{t.client_title}</p>
                    <div className="flex gap-0.5 mt-2">
                      {Array(t.rating || 5).fill(0).map((_, i) => (
                        <span key={i} className="text-yellow-500 text-sm">★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CONTACTS TAB ── */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Contact Submissions
              {contacts.filter((c) => !c.is_read).length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({contacts.filter((c) => !c.is_read).length} unread)
                </span>
              )}
            </h2>
            {contacts.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8">No contact submissions yet.</p>
            ) : (
              <div className="grid gap-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`border border-border p-4 rounded-lg ${contact.is_read ? 'bg-card' : 'bg-primary/5 border-primary/20'}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{contact.name}</h3>
                          {!contact.is_read && (
                            <span className="px-2 py-0.5 bg-foreground text-background text-xs rounded">New</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        {contact.phone && <p className="text-sm text-muted-foreground">{contact.phone}</p>}
                        <p className="text-sm mt-2">{contact.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(contact.created_at).toLocaleDateString('en-KE', { dateStyle: 'medium' })}
                        </p>
                      </div>
                      <button
                        onClick={() => handleMarkContactAsRead(contact.id, contact.is_read)}
                        className="px-3 py-1.5 bg-muted rounded hover:bg-muted/80 text-xs uppercase tracking-wider whitespace-nowrap"
                      >
                        {contact.is_read ? 'Mark Unread' : 'Mark Read'}
                      </button>
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
