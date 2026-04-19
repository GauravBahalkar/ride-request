import { useMemo, useState, useRef } from 'react'
import { IdCard, Upload, UserCircle2, Camera } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { userApi } from '../../services/user.api'
import { documentApi } from '../../services/document.api'
import { handleApiError } from '../../utils/handleApiError'
import { toast } from 'sonner'

type DocumentItem = {
  id: string
  label: string
  fileName: string
}

export const ProfilePage = () => {
  const { user, refreshProfile } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [mobileNo, setMobileNo] = useState(user?.mobileNo ?? '')
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [message, setMessage] = useState('')
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const requiredDocs = useMemo(
    () =>
      user?.role === 'vendor'
        ? ['Aadhaar Card', 'Driving License']
        : ['Aadhaar Card', 'Driving License'],
    [user?.role],
  )

  if (!user) return null

  const onSave = async () => {
    try {
      setSaving(true)
      setMessage('')
      await userApi.updateProfile({ name, mobileNo })
      await refreshProfile()
      toast.success('Profile updated successfully.')
    } catch (err: any) {
      handleApiError(err)
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploadingAvatar(true)
      await userApi.uploadProfilePhoto(file)
      await refreshProfile()
      toast.success('Avatar updated successfully.')
    } catch (err) {
      handleApiError(err)
    } finally {
      setUploadingAvatar(false)
    }
  }

  const uploadDocument = async (label: string, file?: File) => {
    if (!file) return
    try {
      const docType = label.toLowerCase().includes('aadhaar') ? 'aadhar' : 'license'
      await documentApi.uploadUserDocument(docType, file)
      setDocuments((prev) => [
        ...prev.filter((item) => item.label !== label),
        { id: label, label, fileName: file.name },
      ])
      toast.success(`${label} uploaded successfully.`)
    } catch (err) {
      handleApiError(err)
    }
  }

  return (
    <section className="page-enter mx-auto max-w-[980px] space-y-5">
      <h1 className="text-5xl font-bold text-slate-900">Profile</h1>
      <div className="grid gap-5 md:grid-cols-[280px,1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
          <div 
            onClick={() => avatarInputRef.current?.click()}
            className="group relative mx-auto mb-4 h-24 w-24 cursor-pointer overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ring-1 ring-slate-200"
          >
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-content-center text-3xl font-bold text-indigo-300">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 grid place-content-center bg-black/40 opacity-0 transition group-hover:opacity-100">
              <Camera size={24} className="text-white" />
            </div>
            {uploadingAvatar && (
              <div className="absolute inset-0 grid place-content-center bg-white/60">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={avatarInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleAvatarUpload} 
          />
          <p className="text-xl font-bold text-slate-900">{user.name}</p>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{user.role}</p>
          <p className="mt-2 text-sm text-slate-500">{user.email}</p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-2xl font-semibold text-slate-900">Personal Information</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1 text-sm text-slate-600">Name</p>
              <input
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 text-sm text-slate-600">Email</p>
              <input className="w-full rounded-xl border border-slate-300 px-3 py-2 bg-slate-50" value={user.email} disabled />
            </div>
            <div>
              <p className="mb-1 text-sm text-slate-600">Mobile Number</p>
              <input
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
                value={mobileNo ?? ''}
                onChange={(event) => setMobileNo(event.target.value)}
              />
            </div>
          </div>
          <Button className="mt-5 h-11 min-w-32" onClick={onSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
          {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
        </article>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-2xl font-semibold text-slate-900">
          {user.role === 'vendor' ? 'Vendor Documents' : 'Customer Documents'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Upload your verification documents (UI ready; backend endpoint pending for persistent storage).
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {requiredDocs.map((label) => {
            const uploaded = documents.find((item) => item.label === label)
            return (
              <label key={label} className="cursor-pointer rounded-xl border border-dashed border-slate-300 p-4">
                <p className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <IdCard size={15} />
                  {label}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Upload size={14} />
                  <span>{uploaded ? uploaded.fileName : 'Choose file to upload'}</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) => uploadDocument(label, event.target.files?.[0])}
                />
              </label>
            )
          })}
        </div>
      </article>
    </section>
  )
}
