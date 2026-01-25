import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1200px',
			},
		},
		extend: {
			colors: {
				brand: {
					dark: '#124B2B',
					base: '#1F6F43'
				},
				gray: {
					100: '#F8F9FA',
					200: '#E5E7EB',
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#111827'
				},
				black: '#000000',
				white: '#ffffff',
				danger: '#EF4444',
				success: '#19AD70',
				blue: {
					dark: '#1D4ED8',
					base: '#2563EB',
					light: '#DBEAFE',
				},
				purple: {
					dark: '#7E22CE',
					base: '#9333EA',
					light: '#F3E8FF',
				},
				pink: {
					dark: '#BE185D',
					base: '#DB2777',
					light: '#FCE7F3',
				},
				red: {
					dark: '#B91C1C',
					base: '#DC2626',
					light: '#FEE2E2',
				},
				orange: {
					dark: '#C2410C',
					base: '#EA580C',
					light: '#FFEDD5',
				},
				yellow: {
					dark: '#A16207',
					base: '#CA8A04',
					light: '#F7F3CA',
				},
				green: {
					dark: '#15803D',
					base: '#16A34A',
					light: '#E0FAE9',
				},
			},
			borderRadius: {
				lg: '0.5rem',
				md: 'calc(0.5rem - 2px)',
				sm: 'calc(0.5rem - 4px)',
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			}
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require('tailwindcss-animate')],
} satisfies Config;