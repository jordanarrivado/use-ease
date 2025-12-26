'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

interface AnnouncementFormProps {
  onClose: () => void;
}

export default function AnnouncementForm({ onClose }: AnnouncementFormProps) {
  const { addAnnouncement } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    publishAt: new Date().toISOString().slice(0, 16)
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.content) return;
    addAnnouncement({ ...formData, isAuto: false });
    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Publish At</label>
        <input
          type="datetime-local"
          value={formData.publishAt}
          onChange={e => setFormData({ ...formData, publishAt: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Announcement
        </button>
        <button
          onClick={onClose}
          className="px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}