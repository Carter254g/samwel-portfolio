import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Note: In production, implement proper authentication here
  // For now, redirecting to a setup page
  redirect('/admin/setup');
}
