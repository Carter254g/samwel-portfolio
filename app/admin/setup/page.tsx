export default function AdminSetupPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard Setup</h1>

        <div className="space-y-8">
          <section className="bg-card border border-border p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 1: Database Setup</h2>
            <p className="text-muted-foreground mb-4">
              Run the database initialization script to create the necessary tables:
            </p>
            <div className="bg-background p-4 rounded border border-border font-mono text-sm overflow-x-auto mb-4">
              <code>node scripts/init-db.mjs</code>
            </div>
            <p className="text-muted-foreground text-sm">
              This will create the following tables:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>photographers - Basic photographer information</li>
                <li>services - Service offerings</li>
                <li>portfolios - Gallery items</li>
                <li>testimonials - Client reviews</li>
                <li>contact_submissions - Form submissions</li>
              </ul>
            </p>
          </section>

          <section className="bg-card border border-border p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 2: Authentication Setup</h2>
            <p className="text-muted-foreground mb-4">
              To implement admin authentication:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Enable Supabase Auth in your Supabase dashboard</li>
              <li>Configure authentication providers (Email/Password recommended)</li>
              <li>Set up RLS policies on the admin dashboard pages</li>
              <li>Create an admin user in Supabase Auth</li>
            </ol>
          </section>

          <section className="bg-card border border-border p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 3: Content Management</h2>
            <p className="text-muted-foreground mb-4">
              The portfolio uses Supabase as the CMS. To manage content:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Go to your Supabase project dashboard</li>
              <li>Navigate to the Table Editor</li>
              <li>Edit tables directly: photographers, services, portfolios, testimonials</li>
              <li>Upload images to Vercel Blob or use external image URLs</li>
            </ol>
          </section>

          <section className="bg-card border border-border p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Current Implementation</h2>
            <p className="text-muted-foreground mb-4">
              The portfolio currently uses:
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>✓ Static hero section with photographer information</li>
              <li>✓ Services section with card-based layout</li>
              <li>✓ Portfolio gallery with filtering by category</li>
              <li>✓ About section with photographer bio</li>
              <li>✓ Client testimonials carousel</li>
              <li>✓ Contact form with email validation</li>
              <li>⚠ Contact submissions currently logged to console</li>
              <li>⚠ Admin dashboard requires authentication setup</li>
            </ul>
          </section>

          <section className="bg-blue-900/20 border border-blue-700 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-200">Next Steps</h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-200">
              <li>Run the database initialization script</li>
              <li>Set up Supabase Auth for admin access</li>
              <li>Customize photographer information in the database</li>
              <li>Upload your own portfolio images</li>
              <li>Configure email notifications for contact submissions</li>
              <li>Deploy to Vercel</li>
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}
