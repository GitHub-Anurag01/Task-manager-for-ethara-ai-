import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Eye, EyeOff, Zap, Mail, Lock, ArrowRight,
  CheckCircle2, Users, BarChart3, Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

/* ─── tiny reusable stat pill for the left panel ─────────────────────────── */
function StatPill({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={16} className="text-white" />
      </div>
      <div>
        <p className="text-white font-semibold text-sm leading-none">{value}</p>
        <p className="text-white/50 text-xs mt-0.5">{label}</p>
      </div>
    </div>
  );
}

/* ─── feature bullet for the left panel ──────────────────────────────────── */
function Feature({ text }) {
  return (
    <li className="flex items-center gap-2.5 text-white/70 text-sm">
      <CheckCircle2 size={15} className="text-primary-400 flex-shrink-0" />
      {text}
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function LoginPage() {
  /* ── ALL EXISTING LOGIC — UNTOUCHED ──────────────────────────────────── */
  const { login }   = useAuth();
  const navigate    = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.token, res.data.user);
      toast.success('Welcome back, ' + res.data.user.name + '!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  /* ── END EXISTING LOGIC ──────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* ── Ambient background blobs ──────────────────────────────────────── */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px]" />
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── Main card (split layout) ──────────────────────────────────────── */}
      <div className="relative w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/5">

        {/* ════════════════════════════════════════════════════════════════════
            LEFT PANEL — branding + features
            Hidden on mobile, visible from lg breakpoint
            ════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex lg:w-[52%] flex-col justify-between p-10 bg-gradient-to-br from-primary-700 via-primary-600 to-violet-700 relative overflow-hidden">

          {/* decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

          {/* logo */}
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">TaskFlow</span>
          </div>

          {/* headline */}
          <div className="relative space-y-5">
            <div>
              <h1 className="text-3xl font-bold text-white leading-tight">
                Manage your team's<br />
                work <span className="text-white/70 italic">effortlessly.</span>
              </h1>
              <p className="text-white/60 text-sm mt-3 leading-relaxed max-w-xs">
                Assign tasks, track progress, and hit every deadline — all in one
                beautifully simple workspace.
              </p>
            </div>

            {/* feature list */}
            <ul className="space-y-2.5">
              <Feature text="Role-based access for admins and members" />
              <Feature text="Real-time dashboard with visual charts" />
              <Feature text="Kanban board with drag-and-drop tasks" />
              <Feature text="Deadline tracking and overdue alerts" />
            </ul>

            {/* stat pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <StatPill icon={Users}      value="2,400+"  label="Active teams"    color="bg-white/20" />
              <StatPill icon={CheckCircle2} value="98%"   label="On-time delivery" color="bg-emerald-500/40" />
              <StatPill icon={BarChart3}  value="12k+"    label="Tasks completed"  color="bg-violet-500/40" />
              <StatPill icon={Layers}     value="5 min"   label="Avg. setup time"  color="bg-amber-500/40" />
            </div>
          </div>

          {/* bottom quote */}
          <div className="relative">
            <p className="text-white/40 text-xs italic">
              "TaskFlow ne hamare project delays 40% kam kar diye pehle hi mahine mein."
            </p>
            <p className="text-white/30 text-xs mt-1">— Engineering team, Infosys Pune</p>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            RIGHT PANEL — login form
            ════════════════════════════════════════════════════════════════════ */}
        <div className="flex-1 bg-slate-900/95 backdrop-blur-xl flex flex-col justify-center px-8 py-10 sm:px-12">

          {/* mobile-only logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-bold text-white text-xl">TaskFlow</span>
          </div>

          {/* heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Welcome back 👋
            </h2>
            <p className="text-slate-400 text-sm mt-1.5">
              Sign in to continue to your workspace.
            </p>
          </div>

          {/* ── FORM — all register() calls, handlers, and field names unchanged ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

            {/* Email field */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-widest"
              >
                Email address
              </label>
              <div className="relative group">
                {/* icon */}
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors duration-200 pointer-events-none"
                />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`
                    w-full bg-slate-800/60 border text-slate-100 rounded-xl
                    pl-10 pr-4 py-3 text-sm placeholder-slate-600
                    focus:outline-none focus:ring-2 focus:ring-primary-500/60 focus:border-primary-500/60
                    transition-all duration-200
                    ${errors.email
                      ? 'border-red-500/60 focus:ring-red-500/40'
                      : 'border-slate-700/60 hover:border-slate-600'}
                  `}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
                  })}
                />
              </div>
              {errors.email && (
                <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-slate-400 uppercase tracking-widest"
                >
                  Password
                </label>
                {/* Forgot password — UI only, no logic change */}
                <button
                  type="button"
                  className="text-xs text-primary-400 hover:text-primary-300 transition-colors duration-150 font-medium"
                  onClick={() => toast('Password reset coming soon!', { icon: '🔑' })}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                {/* icon */}
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors duration-200 pointer-events-none"
                />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`
                    w-full bg-slate-800/60 border text-slate-100 rounded-xl
                    pl-10 pr-11 py-3 text-sm placeholder-slate-600
                    focus:outline-none focus:ring-2 focus:ring-primary-500/60 focus:border-primary-500/60
                    transition-all duration-200
                    ${errors.password
                      ? 'border-red-500/60 focus:ring-red-500/40'
                      : 'border-slate-700/60 hover:border-slate-600'}
                  `}
                  {...register('password', { required: 'Password is required' })}
                />
                {/* show/hide toggle — existing handler untouched */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors duration-150 p-0.5 rounded"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit button — existing onSubmit / loading state untouched */}
            <button
              type="submit"
              disabled={loading}
              className="
                relative w-full flex items-center justify-center gap-2.5
                bg-gradient-to-r from-primary-600 to-violet-600
                hover:from-primary-500 hover:to-violet-500
                active:scale-[0.98]
                text-white font-semibold text-sm rounded-xl
                py-3 px-6 mt-2
                shadow-lg shadow-primary-900/40
                hover:shadow-primary-800/50
                transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
                focus:outline-none focus:ring-2 focus:ring-primary-500/60 focus:ring-offset-2 focus:ring-offset-slate-900
              "
            >
              {loading ? (
                <>
                  {/* spinner */}
                  <svg
                    className="animate-spin h-4 w-4 text-white/80"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs">or</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* sign up link — existing Link untouched */}
          <p className="text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary-400 hover:text-primary-300 font-semibold transition-colors duration-150 underline underline-offset-2 decoration-primary-600/40 hover:decoration-primary-400"
            >
              Create one free
            </Link>
          </p>

          {/* demo credentials hint */}
          <div className="mt-6 p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/40">
            <p className="text-center text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">
              Demo credentials
            </p>
            <div className="flex flex-col gap-1 text-center">
              <p className="text-xs text-slate-400">
                <span className="text-slate-500">Admin →</span>{' '}
                <span className="font-mono text-primary-400">admin@taskflow.dev</span>
                {' / '}
                <span className="font-mono text-primary-400">Admin@1234</span>
              </p>
              <p className="text-xs text-slate-400">
                <span className="text-slate-500">Member →</span>{' '}
                <span className="font-mono text-primary-400">reyan@taskflow.dev</span>
                {' / '}
                <span className="font-mono text-primary-400">Member@1234</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
