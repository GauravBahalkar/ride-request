import { useEffect, useMemo, useState, useRef } from 'react'
import { IdCard, Upload, UserCircle2, Camera, ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { userApi } from '../../services/user.api'
import { documentApi } from '../../services/document.api'
import { handleApiError } from '../../utils/handleApiError'
import { toast } from 'sonner'

type UserDocument = {
  id: number
  documentType: 'aadhar' | 'license'
  documentUrl: string
  status: 'pending' | 'verified' | 'rejected'
  rejectionReason?: string
}

export const ProfilePage = () => {
  const { user, refreshProfile } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [mobileNo, setMobileNo] = useState(user?.mobileNo ?? '')
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [message, setMessage] = useState('')
  const [userDocs, setUserDocs] = useState<UserDocument[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const fetchUserDocs = async () => {
    try {
      setLoadingDocs(true)
      const docs = await documentApi.getUserDocuments()
      setUserDocs(docs)
    } catch (err) {
      handleApiError(err)
    } finally {
      setLoadingDocs(false)
    }
  }

  useEffect(() => {
    fetchUserDocs()
  }, [])

  const requiredDocs = [
    { label: 'Aadhaar Card', type: 'aadhar' },
    { label: 'Driving License', type: 'license' },
  ]

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

  const uploadDocument = async (type: string, label: string, file?: File) => {
    if (!file) return
    try {
      toast.loading(`Uploading ${label}...`)
      await documentApi.uploadUserDocument(type, file)
      await fetchUserDocs()
      toast.dismiss()
      toast.success(`${label} uploaded successfully.`)
    } catch (err) {
      toast.dismiss()
      handleApiError(err)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full"><CheckCircle size={12} /> Verified</span>
      case 'rejected':
        return <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-xs bg-rose-50 px-2 py-0.5 rounded-full"><XCircle size={12} /> Rejected</span>
      default:
        return <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-full"><Clock size={12} /> Pending</span>
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
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {requiredDocs.map(({ label, type }) => {
            const doc = userDocs.find((d) => d.documentType === type)
            return (
              <div key={type} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all hover:bg-white hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 font-bold text-slate-900">
                    <IdCard size={18} className="text-indigo-600" />
                    {label}
                  </p>
                  {doc && getStatusBadge(doc.status)}
                </div>

                {doc ? (
                  <div className="space-y-3">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <img src={doc.documentUrl} alt={label} className="h-full w-full object-cover" />
                      <a 
                        href={doc.documentUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute right-2 top-2 rounded-lg bg-black/50 p-1.5 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    {doc.status === 'rejected' && doc.rejectionReason && (
                      <p className="text-xs text-rose-500 font-medium bg-rose-50 p-2 rounded-lg italic">
                        Reason: {doc.rejectionReason}
                      </p>
                    )}
                    <label className="inline-block cursor-pointer text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                      Re-upload Document
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(event) => uploadDocument(type, label, event.target.files?.[0])}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white transition-colors hover:border-indigo-400 hover:bg-indigo-50/30">
                    <div className="rounded-full bg-indigo-50 p-2 text-indigo-600 mb-2">
                      <Upload size={20} />
                    </div>
                    <span className="text-sm font-semibold text-slate-600 text-center px-4">Click to upload your {label}</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(event) => uploadDocument(type, label, event.target.files?.[0])}
                    />
                  </label>
                )}
              </div>
            )
          })}
        </div>

      </article>
    </section>
  )
}
