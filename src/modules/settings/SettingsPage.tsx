import { useAppSelector } from '@/store'
import { Card } from '@/components/card/Card'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'

export function SettingsPage() {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Settings</h1>
      <p className="text-neutral-500 mb-10">Manage your account and preferences</p>

      <div className="flex flex-col gap-8">
        <Card>
          <h2 className="text-base font-semibold text-neutral-900 mb-6">
            Profile
          </h2>
          <div className="flex flex-col gap-5">
            <Input
              id="settings-name"
              label="Full Name"
              defaultValue={user?.name ?? ''}
              placeholder="Your name"
            />
            <Input
              id="settings-email"
              label="Email"
              type="email"
              defaultValue={user?.email ?? ''}
              placeholder="you@example.com"
              disabled
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button size="sm">Save Changes</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-neutral-900 mb-2">
            Plan
          </h2>
          <p className="text-sm text-neutral-500 mb-4">
            You are currently on the <span className="font-medium text-neutral-700">Free</span> plan.
          </p>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-primary-50 border border-primary-100">
            <div className="flex-1">
              <p className="text-sm font-medium text-primary-700">
                Upgrade to Pro
              </p>
              <p className="text-xs text-primary-500 mt-0.5">
                Unlock unlimited forms, responses, and advanced analytics.
              </p>
            </div>
            <Button size="sm">Upgrade</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-neutral-900 mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-neutral-500 mb-4">
            Permanently delete your account and all associated data.
          </p>
          <Button variant="danger" size="sm">
            Delete Account
          </Button>
        </Card>
      </div>
    </div>
  )
}
