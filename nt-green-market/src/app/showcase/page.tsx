import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input, Select, FormField } from "@/components/ui/input"
import { Navbar } from "@/components/ui/navbar"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Browse" },
  { href: "/donate", label: "Donate", active: true },
  { href: "/admin", label: "Admin" },
]

export default function ShowcasePage() {
  return (
    <>
      <Navbar links={navLinks} />

      <main className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-semibold text-gray-900">Buttons</h2>
          <div className="flex flex-wrap gap-8 items-end">
            {[
              { variant: "primary",     label: "Place Order" },
              { variant: "secondary",   label: "View Details" },
              { variant: "ghost",       label: "Cancel" },
              { variant: "success",     label: "Confirm Order" },
              { variant: "destructive", label: "Delete Shop" },
            ].map(({ variant, label }) => (
              <div key={variant} className="flex flex-col items-center gap-2">
                <Button variant={variant as "primary" | "secondary" | "ghost" | "success" | "destructive"}>{label}</Button>
                <span className="text-xs text-gray-400 font-mono">{variant}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-8 items-end">
            {[
              { size: "sm",      label: "Small" },
              { size: "default", label: "Default" },
              { size: "lg",      label: "Large" },
            ].map(({ size, label }) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Button variant="primary" size={size as "sm" | "default" | "lg"}>{label}</Button>
                <span className="text-xs text-gray-400 font-mono">size="{size}"</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <Button variant="primary" disabled>Disabled</Button>
              <span className="text-xs text-gray-400 font-mono">disabled</span>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-semibold text-gray-900">Badges</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-3">Role badges</p>
              <div className="flex flex-wrap gap-6 items-end">
                {(["buyer", "seller", "admin"] as const).map((v) => (
                  <div key={v} className="flex flex-col items-center gap-1.5">
                    <Badge variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
                    <span className="text-xs text-gray-400 font-mono">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-3">Order status badges</p>
              <div className="flex flex-wrap gap-6 items-end">
                {(["pending", "confirmed", "ready", "completed", "cancelled"] as const).map((v) => (
                  <div key={v} className="flex flex-col items-center gap-1.5">
                    <Badge variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
                    <span className="text-xs text-gray-400 font-mono">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-semibold text-gray-900">Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <Card>
                <CardHeader>
                  <Badge variant="seller" className="w-fit mb-2">Seller</Badge>
                  <CardTitle>Fresh Vegetables</CardTitle>
                  <CardDescription>Organic produce from Da Lat farms</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold text-gray-900">120,000 VND</p>
                  <p className="text-sm text-gray-500 mt-1">All proceeds go to charity</p>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" size="sm">Add to Cart</Button>
                </CardFooter>
              </Card>
              <span className="text-xs text-gray-400 font-mono text-center">product card</span>
            </div>

            <div className="flex flex-col gap-2">
              <Card>
                <CardHeader>
                  <Badge variant="confirmed" className="w-fit mb-2">Confirmed</Badge>
                  <CardTitle>Order #1042</CardTitle>
                  <CardDescription>Placed 28 Mar 2026</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">3 items · 360,000 VND</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm">View Order</Button>
                </CardFooter>
              </Card>
              <span className="text-xs text-gray-400 font-mono text-center">order card</span>
            </div>

            <div className="flex flex-col gap-2">
              <Card>
                <CardHeader>
                  <CardTitle>Charity Goal</CardTitle>
                  <CardDescription>Help us reach 50,000,000 VND</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "68%" }} />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">34,000,000 / 50,000,000 VND raised</p>
                </CardContent>
                <CardFooter>
                  <Button variant="success" size="sm">Donate Now</Button>
                </CardFooter>
              </Card>
              <span className="text-xs text-gray-400 font-mono text-center">charity card</span>
            </div>
          </div>
        </section>

        {/* Form Inputs */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-semibold text-gray-900">Form Inputs</h2>
          <div className="max-w-xl space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <Input id="first-name" label="First name*" error="Please complete this required field." />
              <Input id="last-name" label="Last name*" defaultValue="chu" />
            </div>
            <Input id="email" label="Email address*" type="email" defaultValue="khanh@gmail.com" />
            <div className="grid grid-cols-2 gap-6">
              <Input id="phone" label="Phone number*" defaultValue="091723982164" />
              <Select
                id="region"
                label="Region*"
                defaultValue="asia"
                options={[
                  { value: "", label: "Please select" },
                  { value: "asia", label: "Asia" },
                  { value: "au", label: "Australia & Oceania" },
                  { value: "africa", label: "Africa" },
                  { value: "na", label: "North America" },
                  { value: "uk", label: "United Kingdom & Ireland" },
                  { value: "eu", label: "Europe" },
                ]}
              />
            </div>
            <Input id="company" label="Company name*" defaultValue="asfd" />
            <Input id="disabled-field" label="Disabled field" disabled defaultValue="Cannot edit" />
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-4">
          <h2 className="font-heading text-3xl font-semibold text-gray-900">Color Palette</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { name: "Primary", bg: "bg-primary", text: "#D6001C" },
              { name: "Secondary", bg: "bg-secondary", text: "#6A1F7A" },
              { name: "Accent", bg: "bg-accent", text: "#2D7A4F" },
              { name: "Warning", bg: "bg-warning", text: "#F4AD33" },
              { name: "Info", bg: "bg-info", text: "#0094D5" },
              { name: "Gray 900", bg: "bg-gray-900", text: "#2A2E3A" },
              { name: "Gray 500", bg: "bg-gray-500", text: "#6C7685" },
              { name: "Gray 200", bg: "bg-gray-200 border", text: "#D9D9D9" },
              { name: "Gray 50", bg: "bg-gray-50 border", text: "#F6F7F8" },
            ].map(({ name, bg, text }) => (
              <div key={name} className="flex flex-col items-center gap-1">
                <div className={`w-14 h-14 rounded-md ${bg}`} />
                <p className="text-xs text-gray-700 font-medium">{name}</p>
                <p className="text-xs text-gray-400">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="font-heading text-3xl font-semibold text-gray-900">Typography</h2>
          <div className="space-y-2">
            <p className="font-heading text-5xl font-bold text-gray-900">Hero Heading — Mulish 48px</p>
            <p className="font-heading text-4xl font-bold text-gray-900">Page Title — Mulish 36px</p>
            <p className="font-heading text-3xl font-semibold text-gray-900">Section Heading — Mulish 30px</p>
            <p className="font-heading text-2xl font-semibold text-gray-900">Card Heading — Mulish 24px</p>
            <p className="text-lg font-medium text-gray-700">Lead text — Inter 18px</p>
            <p className="text-base text-gray-700">Body text — Inter 16px. All profits go directly to charity partners.</p>
            <p className="text-sm text-gray-500">Secondary text — Inter 14px</p>
            <p className="text-xs text-gray-400">Caption / badge label — Inter 12px</p>
          </div>
        </section>

      </main>
    </>
  )
}
