import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, CalendarDays, CheckCircle2 } from "lucide-react";
import { showError } from "@/utils/toast";

emailjs.init("tkbgpS1hIp5eMXjU9");

const EMAILJS_SERVICE_ID = "service_0rynluv";
const EMAILJS_TEMPLATE_ID = "template_hjx5cwj";

const DEADLINE = new Date("2026-07-24");

const JOBS = [
  {
    id: "graphic-designer",
    title: "Simple Graphic Designer",
    location: "Remote / Office-based",
    type: "Full-time",
    description:
      "We're looking for a creative graphic designer to craft visual assets for our brand, social media, and marketing campaigns. You will work closely with our team to maintain a consistent and appealing visual identity across all platforms.",
    requirements: [
      "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      "Strong portfolio demonstrating design skills",
      "Experience with social media graphics and brand identity",
      "Ability to work independently and meet deadlines",
      "Excellent communication skills",
    ],
  },
  {
    id: "app-developer",
    title: "App Developer",
    location: "Remote / Office-based",
    type: "Full-time",
    description:
      "We are looking for an app developer who is comfortable using a laptop and mobile device. No prior coding experience required — we will train the right candidate.",
    requirements: [
      "Proficient in using a laptop and mobile device",
      "Willingness to learn new tools and technologies",
      "Good problem-solving attitude",
      "Basic understanding of how websites and apps work",
      "Strong communication and teamwork skills",
    ],
  },
];

const getRemainingDays = () => {
  const now = new Date();
  const diff = Math.ceil((DEADLINE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
};

const Career = () => {
  const [dialogJob, setDialogJob] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const [successJob, setSuccessJob] = useState("");

  const remainingDays = useMemo(() => getRemainingDays(), []);
  const isPastDeadline = remainingDays <= 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dialogJob || submitting) return;
    const job = JOBS.find((j) => j.id === dialogJob);
    if (!job) return;

    setSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          job_title: job.title,
          name,
          email,
          phone: phone || "N/A",
          cover_letter: coverLetter,
        },
      );

      setSubmitted((prev) => new Set(prev).add(dialogJob));
      setDialogJob(null);
      setSuccessJob(job.title);
      setShowSuccess(true);
    } catch (err: any) {
      console.error("EmailJS error:", err);
      const msg = err?.text || err?.message || "Unknown error";
      showError(`Failed to send: ${msg}. You can also email us directly at info@goalplanner.io.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicPageLayout>
      <Seo
        title="Careers at Lifeplans | GoalPlanner.io"
        description="Join the Lifeplans team. View open positions for Simple Graphic Designer and App Developer. Apply now and help us build the future of goal planning."
        canonicalPath="/career"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          name: "Careers at Lifeplans",
          url: "https://goalplanner.io/career",
          description: "Open positions at Lifeplans including Simple Graphic Designer and App Developer.",
        }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-700 dark:via-indigo-800 dark:to-purple-900 p-10 md:p-14 text-white shadow-2xl shadow-blue-500/20 dark:shadow-blue-900/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          <div className="relative space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Join Our Team</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
              Help us build the future of goal planning. We're looking for passionate people who want to make a difference.
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Open Positions</h2>
          <p className="text-gray-500 dark:text-slate-400">
            Currently we have two open roles. We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {JOBS.map((job) => {
            const alreadySubmitted = submitted.has(job.id);
            return (
            <Card key={job.id} className="border-0 shadow-sm dark:shadow-slate-900/40 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20 shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  {!isPastDeadline && (
                    <Badge variant="secondary" className="shrink-0 text-xs flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-0">
                      <CalendarDays className="w-3 h-3" />
                      {remainingDays} {remainingDays === 1 ? "day" : "days"} left
                    </Badge>
                  )}
                  {isPastDeadline && (
                    <Badge variant="secondary" className="shrink-0 text-xs px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-0">
                      Closed
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">{job.title}</CardTitle>
                <div className="flex flex-wrap gap-3 mt-1">
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {job.type}
                  </div>
                </div>
                <CardDescription className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                  {job.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Requirements</h4>
                <ul className="space-y-1.5">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                {alreadySubmitted ? (
                  <Button disabled className="w-full rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-0 cursor-default">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Application Submitted
                  </Button>
                ) : isPastDeadline ? (
                  <Button disabled className="w-full rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-0 cursor-default">
                    Applications Closed
                  </Button>
                ) : (
                  <Dialog open={dialogJob === job.id} onOpenChange={(open) => {
                    if (open) { setName(""); setEmail(""); setPhone(""); setCoverLetter(""); setDialogJob(job.id); }
                    else setDialogJob(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                        <DialogDescription>
                          Fill out the form below. We'll review your application and get back to you.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="apply-name">Full Name</Label>
                          <Input id="apply-name" value={name} onChange={(e) => setName(e.target.value)} required className="rounded-xl" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="apply-email">Email</Label>
                          <Input id="apply-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-xl" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="apply-phone">Phone (optional)</Label>
                          <Input id="apply-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="apply-cover">Cover Letter / Message</Label>
                          <textarea
                            id="apply-cover"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            required
                            rows={5}
                            className="min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          />
                        </div>
                        <DialogFooter className="flex-col gap-2">
                          <Button type="submit" disabled={submitting} className="rounded-xl bg-blue-600 hover:bg-blue-700 w-full">
                            {submitting ? "Sending..." : "Submit Application"}
                          </Button>
                          <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                            Having issues? Email us directly at{' '}
                            <a href="mailto:info@goalplanner.io" className="text-blue-600 dark:text-blue-400 underline">info@goalplanner.io</a>
                          </p>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </CardFooter>
            </Card>
            );
          })}
        </div>

        {/* Success Modal */}
        <Dialog open={showSuccess} onOpenChange={(open) => { if (!open) setShowSuccess(false); }}>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col items-center py-6 space-y-4 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center animate-scale-in">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                Application Sent!
              </DialogTitle>
              <p className="text-center text-gray-600 dark:text-slate-300 max-w-sm">
                Thank you for applying for the <strong>{successJob}</strong> position. We'll review your application and get back to you soon.
              </p>
              <Button
                onClick={() => setShowSuccess(false)}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 px-8 mt-2"
              >
                Done
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Why Join Us */}
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/40 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/80 p-8 shadow-sm dark:shadow-slate-900/30 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why Join Lifeplans?</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-green-600 dark:text-green-400 text-lg font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Remote-first</p>
                <p>Work from anywhere in the world.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-green-600 dark:text-green-400 text-lg font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Growth Opportunities</p>
                <p>Learn, experiment, and advance your career.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-green-600 dark:text-green-400 text-lg font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Impactful Work</p>
                <p>Help thousands of users achieve their goals.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-green-600 dark:text-green-400 text-lg font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Great Culture</p>
                <p>Collaborative, supportive, and innovative team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default Career;
