import { Courier_Prime } from 'next/font/google'
import { Cutive_Mono } from 'next/font/google'
import { Noto_Serif_TC } from 'next/font/google'
import { Noto_Sans_TC } from 'next/font/google'

export const courierPrime  = Courier_Prime({ 
    weight: '400',
    subsets: ['latin'], 
    variable: '--courierPrime-font'
});
export const cutiveMono = Cutive_Mono({
    weight: '400',
    subsets: ['latin'],
    variable: '--cutiveMono-font'
});
export const notoSerifTC  = Noto_Serif_TC({ 
    subsets: ['latin'], 
    weight: '400' ,
    variable: '--notoSerifTC-font'
});
export const notoSansTC  = Noto_Sans_TC({
    subsets: ['latin'], 
    weight: '400' ,
    variable: '--notoSansTC-font'
})