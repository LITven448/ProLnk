import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Eye, Sun, Moon, Monitor, Globe, Shield, CheckCircle, XCircle,
  AlertTriangle, Play, Save, Clock, Type, Zap, Keyboard,
  Contrast, Volume2, MousePointer
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const WCAG_CHECKS = [
  { id: "1.1.1", name: "Non-text Content", level: "A", status: "pass", lastTested: "2026-05-13" },
  { id: "1.4.1", name: "Use of Color", level: "A", status: "pass", lastTested: "2026-05-13" },
  { id: "1.4.3", name: "Contrast (Minimum)", level: "AA", status: "pass", lastTested: "2026-05-13" },
  { id: "1.4.4", name: "Resize Text", level: "AA", status: "pass", lastTested: "2026-05-12" },
  { id: "2.1.1", name: "Keyboard Navigation", level: "A", status: "warning", lastTested: "2026-05-12" },
  { id: "2.4.1", name: "Bypass Blocks", level: "A", status: "pass", lastTested: "2026-05-11" },
  { id: "3.1.1", name: "Language of Page", level: "A", status: "pass", lastTested: "2026-05-11" },
  { id: "4.1.2", name: "Name, Role, Value", level: "A", status: "fail", lastTested: "2026-05-10" },
];

const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${
      enabled ? "bg-teal-600" : "bg-slate-600"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
        enabled ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const wcagStatus = (status: string) => {
  if (status === "pass") return (
    <div className="flex items-center gap-1.5">
      <CheckCircle className="h-4 w-4 text-emerald-400" />
      <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-xs">Pass</Badge>
    </div>
  );
  if (status === "fail") return (
    <div className="flex items-center gap-1.5">
      <XCircle className="h-4 w-4 text-red-400" />
      <Badge className="bg-red-500/20 text-red-400 border-0 text-xs">Fail</Badge>
    </div>
  );
  return (
    <div className="flex items-center gap-1.5">
      <AlertTriangle className="h-4 w-4 text-amber-400" />
      <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">Warning</Badge>
    </div>
  );
};

export default function AccessibilitySettings() {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardHints, setKeyboardHints] = useState(true);
  const [colorBlind, setColorBlind] = useState(false);
  const [colorBlindType, setColorBlindType] = useState("deuteranopia");
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [animationSpeed, setAnimationSpeed] = useState("normal");
  const [language, setLanguage] = useState("en-US");
  const [rtl, setRtl] = useState(false);
  const [dateFormat, setDateFormat] = useState("us");
  const [wcagMode, setWcagMode] = useState(true);
  const [cookieBanner, setCookieBanner] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [testResult, setTestResult] = useState<null | "running" | "done">(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTest = () => {
    setTestResult("running");
    setTimeout(() => setTestResult("done"), 1800);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Eye className="h-6 w-6 text-teal-400" />
              Accessibility Settings
            </h1>
            <p className="text-slate-400 mt-1">Platform accessibility compliance, display preferences, and language settings</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Last saved: 2 hours ago
            </span>
            <Button
              onClick={handleSave}
              className={`gap-2 text-sm ${saved ? "bg-emerald-600 hover:bg-emerald-500" : "bg-teal-600 hover:bg-teal-500"} text-white`}
            >
              {saved ? <CheckCircle className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Saved!" : "Save Settings"}
            </Button>
          </div>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Eye className="h-4 w-4 text-teal-400" /> Accessibility Toggles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Contrast className="h-4 w-4 text-slate-400" />
                  <div>
                    <div className="text-sm text-white font-medium">High Contrast Mode</div>
                    <div className="text-xs text-slate-400">Increase UI contrast for readability</div>
                  </div>
                </div>
                <Toggle enabled={highContrast} onToggle={() => setHighContrast(!highContrast)} />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Type className="h-4 w-4 text-slate-400" />
                  <div>
                    <div className="text-sm text-white font-medium">Large Text</div>
                    <div className="text-xs text-slate-400">Increase base font size to 18px+</div>
                  </div>
                </div>
                <Toggle enabled={largeText} onToggle={() => setLargeText(!largeText)} />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-slate-400" />
                  <div>
                    <div className="text-sm text-white font-medium">Reduce Motion</div>
                    <div className="text-xs text-slate-400">Minimize animations and transitions</div>
                  </div>
                </div>
                <Toggle enabled={reduceMotion} onToggle={() => setReduceMotion(!reduceMotion)} />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-4 w-4 text-slate-400" />
                  <div>
                    <div className="text-sm text-white font-medium">Screen Reader Optimized</div>
                    <div className="text-xs text-slate-400">Enhanced ARIA labels and descriptions</div>
                  </div>
                </div>
                <Toggle enabled={screenReader} onToggle={() => setScreenReader(!screenReader)} />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Keyboard className="h-4 w-4 text-slate-400" />
                  <div>
                    <div className="text-sm text-white font-medium">Keyboard Navigation Hints</div>
                    <div className="text-xs text-slate-400">Show shortcut tooltips on hover</div>
                  </div>
                </div>
                <Toggle enabled={keyboardHints} onToggle={() => setKeyboardHints(!keyboardHints)} />
              </div>
              <div className="p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <MousePointer className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="text-sm text-white font-medium">Color Blind Mode</div>
                      <div className="text-xs text-slate-400">Adjust palette for color vision</div>
                    </div>
                  </div>
                  <Toggle enabled={colorBlind} onToggle={() => setColorBlind(!colorBlind)} />
                </div>
                {colorBlind && (
                  <Select value={colorBlindType} onValueChange={setColorBlindType}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="deuteranopia" className="text-white hover:bg-slate-700 text-xs">Deuteranopia (red-green)</SelectItem>
                      <SelectItem value="protanopia" className="text-white hover:bg-slate-700 text-xs">Protanopia (red-green)</SelectItem>
                      <SelectItem value="tritanopia" className="text-white hover:bg-slate-700 text-xs">Tritanopia (blue-yellow)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Monitor className="h-4 w-4 text-teal-400" /> Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Theme</label>
                <div className="flex gap-1.5">
                  {[
                    { value: "dark", icon: <Moon className="h-3.5 w-3.5" />, label: "Dark" },
                    { value: "light", icon: <Sun className="h-3.5 w-3.5" />, label: "Light" },
                    { value: "auto", icon: <Monitor className="h-3.5 w-3.5" />, label: "Auto" },
                  ].map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTheme(t.value)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs transition-colors ${
                        theme === t.value
                          ? "bg-teal-600 text-white"
                          : "bg-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Font Scale</label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="small" className="text-white hover:bg-slate-700 text-xs">Small (14px)</SelectItem>
                    <SelectItem value="medium" className="text-white hover:bg-slate-700 text-xs">Medium (16px)</SelectItem>
                    <SelectItem value="large" className="text-white hover:bg-slate-700 text-xs">Large (18px)</SelectItem>
                    <SelectItem value="xlarge" className="text-white hover:bg-slate-700 text-xs">X-Large (20px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Animation Speed</label>
                <Select value={animationSpeed} onValueChange={setAnimationSpeed}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="none" className="text-white hover:bg-slate-700 text-xs">None</SelectItem>
                    <SelectItem value="slow" className="text-white hover:bg-slate-700 text-xs">Slow</SelectItem>
                    <SelectItem value="normal" className="text-white hover:bg-slate-700 text-xs">Normal</SelectItem>
                    <SelectItem value="fast" className="text-white hover:bg-slate-700 text-xs">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Globe className="h-4 w-4 text-teal-400" /> Language
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Primary Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="en-US" className="text-white hover:bg-slate-700 text-xs">English (US)</SelectItem>
                    <SelectItem value="en-GB" className="text-white hover:bg-slate-700 text-xs">English (UK)</SelectItem>
                    <SelectItem value="es-US" className="text-white hover:bg-slate-700 text-xs">Español (US)</SelectItem>
                    <SelectItem value="fr-CA" className="text-white hover:bg-slate-700 text-xs">Français (CA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-700/30 rounded-lg">
                <div>
                  <div className="text-xs text-white font-medium">RTL Support</div>
                  <div className="text-xs text-slate-400">Right-to-left text direction</div>
                </div>
                <Toggle enabled={rtl} onToggle={() => setRtl(!rtl)} />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Date Format</label>
                <div className="flex gap-1.5">
                  {[
                    { value: "us", label: "MM/DD/YY" },
                    { value: "iso", label: "YYYY-MM-DD" },
                  ].map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setDateFormat(f.value)}
                      className={`flex-1 py-1.5 rounded text-xs transition-colors ${
                        dateFormat === f.value
                          ? "bg-teal-600 text-white"
                          : "bg-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-teal-400" /> Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2.5 bg-slate-700/30 rounded-lg">
                <div>
                  <div className="text-xs text-white font-medium">WCAG 2.1 AA Mode</div>
                  <div className="text-xs text-slate-400">Enforce AA compliance checks</div>
                </div>
                <Toggle enabled={wcagMode} onToggle={() => setWcagMode(!wcagMode)} />
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-700/30 rounded-lg">
                <div>
                  <div className="text-xs text-white font-medium">Cookie Consent Banner</div>
                  <div className="text-xs text-slate-400">Show GDPR cookie notice</div>
                </div>
                <Toggle enabled={cookieBanner} onToggle={() => setCookieBanner(!cookieBanner)} />
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-700/30 rounded-lg">
                <div>
                  <div className="text-xs text-white font-medium">Privacy Mode</div>
                  <div className="text-xs text-slate-400">Mask PII in logs and analytics</div>
                </div>
                <Toggle enabled={privacyMode} onToggle={() => setPrivacyMode(!privacyMode)} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-teal-400" /> WCAG 2.1 Compliance Audit
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleTest}
                  className="h-7 text-xs bg-slate-700 hover:bg-slate-600 text-white border-0 gap-1.5"
                >
                  <Play className="h-3 w-3" />
                  {testResult === "running" ? "Running..." : "Test Accessibility"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {testResult === "done" && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm text-emerald-300">Accessibility test complete — 6 pass, 1 warning, 1 fail. See table below.</span>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 font-medium pb-2 pr-4">Criterion</th>
                    <th className="text-left text-slate-400 font-medium pb-2 pr-4">Name</th>
                    <th className="text-left text-slate-400 font-medium pb-2 pr-4">Level</th>
                    <th className="text-left text-slate-400 font-medium pb-2 pr-4">Status</th>
                    <th className="text-left text-slate-400 font-medium pb-2">Last Tested</th>
                  </tr>
                </thead>
                <tbody>
                  {WCAG_CHECKS.map((check) => (
                    <tr key={check.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                      <td className="py-3 pr-4 font-mono text-xs text-slate-400">{check.id}</td>
                      <td className="py-3 pr-4 text-white">{check.name}</td>
                      <td className="py-3 pr-4">
                        <Badge className={`border-0 text-xs ${check.level === "AA" ? "bg-blue-500/20 text-blue-400" : "bg-slate-600/40 text-slate-400"}`}>
                          {check.level}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">{wcagStatus(check.status)}</td>
                      <td className="py-3 text-slate-400 text-xs">{check.lastTested}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
