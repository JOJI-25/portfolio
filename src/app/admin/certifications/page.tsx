export default function AdminCertificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Certifications</h1>
          <p className="text-text-secondary mt-1">Manage your achievements and certificates here.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-lg transition-colors opacity-50 cursor-not-allowed">
          + Add Certificate (Coming Soon)
        </button>
      </div>

      <div className="bg-bg-secondary border border-border rounded-xl p-12 text-center">
        <h2 className="text-xl font-medium text-text-primary mb-2">Under Construction 🚧</h2>
        <p className="text-text-secondary">I am actively building the CRUD functionality for this page right now!</p>
      </div>
    </div>
  );
}
