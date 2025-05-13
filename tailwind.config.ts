
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Collab Zone Theme Colors
				quantum: {
					primary: '#4F46E5',
					secondary: '#38BDF8',
					accent: '#6366F1',
					muted: '#1E293B',
					background: '#0F172A',
					foreground: '#F8FAFC',
					border: '#334155',
					grid: '#2563EB'
				},
				prism: {
					primary: '#EC4899',
					secondary: '#8B5CF6',
					accent: '#F472B6',
					muted: '#F1F5F9',
					background: '#FFFFFF',
					foreground: '#0F172A',
					border: '#E2E8F0',
					pulse: '#A855F7'
				},
				eclipse: {
					primary: '#F59E0B',
					secondary: '#78350F',
					accent: '#B45309',
					muted: '#1C1917',
					background: '#0C0A09',
					foreground: '#F5F5F4',
					border: '#292524',
					ember: '#DC2626'
				}
			},
			fontFamily: {
				exo: ['Exo 2', 'sans-serif'],
				rajdhani: ['Rajdhani', 'sans-serif'],
				sans: ['Inter', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundSize: {
				'quantum-grid-size': '30px 30px',
				'200': '200%',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.05)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'rotate-3d': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' }
				},
				'grid-flow': {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '100% 100%' }
				},
				'ember-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(245, 158, 11, 0.5), 0 0 10px rgba(245, 158, 11, 0.3)'
					},
					'50%': { 
						boxShadow: '0 0 10px rgba(245, 158, 11, 0.8), 0 0 20px rgba(245, 158, 11, 0.5)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'rotate-3d': 'rotate-3d 15s linear infinite',
				'grid-flow': 'grid-flow 20s linear infinite',
				'ember-glow': 'ember-glow 3s ease-in-out infinite'
			},
			backgroundImage: {
				'quantum-grid': 'linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)',
				'prism-gradient': 'linear-gradient(120deg, #EC4899, #8B5CF6, #A855F7, #EC4899)',
				'eclipse-metal': 'radial-gradient(circle at top right, #3F3F46, #18181B)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
