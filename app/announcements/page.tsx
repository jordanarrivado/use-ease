'use client';

import { useState } from 'react';
import { Bell, Plus, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import ReminderAlert from '@/components/ReminderAlert';
import Modal from '@/components/Modal';
import AnnouncementForm from '@/components/AnnouncementForm';

export default function AnnouncementsPage() {
  const { announcements, deleteAnnouncement } = useApp();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <ReminderAlert />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          New Announcement
        </button>
      </div>

      <div className="grid gap-4">
        {announcements.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No announcements yet.</p>
          </div>
        ) : (
          announcements.map(announcement => (
            <div
              key={announcement.id}
              className={`bg-white border rounded-lg p-6 hover:shadow-md transition ${
                announcement.isAuto ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold">{announcement.title}</h3>
                    {announcement.isAuto && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        Auto-generated
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Published: {new Date(announcement.publishAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteAnnouncement(announcement.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-700">{announcement.content}</p>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Create New Announcement"
      >
        <AnnouncementForm onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}