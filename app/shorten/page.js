"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setGenerated] = useState("")
    const [loading, setLoading] = useState(false)
    const [recentLinks, setRecentLinks] = useState([])
    const [copySuccess, setCopySuccess] = useState(false)

    useEffect(() => {
        const links = JSON.parse(localStorage.getItem("recentLinks") || "[]")
        setRecentLinks(links)
    }, [])

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    const generate = async () => {
        if (!url || !shorturl) {
            alert("Please fill in both fields")
            return
        }

        if (!isValidUrl(url)) {
            alert("Please enter a valid URL (including http:// or https://)")
            return
        }

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("/api/generate", requestOptions)
            const result = await response.json()
            
            if (result.success) {
                const fullShortUrl = `${window.location.origin}/${shorturl}`
                setGenerated(fullShortUrl)
                
                const newLink = { url, shorturl: fullShortUrl, timestamp: new Date().toISOString() }
                const updatedLinks = [newLink, ...recentLinks.filter(l => l.shorturl !== fullShortUrl).slice(0, 4)]
                setRecentLinks(updatedLinks)
                localStorage.setItem("recentLinks", JSON.stringify(updatedLinks))
                
                seturl("")   
                setshorturl("")
            } else {
                alert(result.message)
            }
        } catch (error) {
            console.error(error)
            alert("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(true)
            setTimeout(() => setCopySuccess(false), 2000)
        })
    }

    return (
        <div className='container mx-auto px-6 py-10 lg:py-16 max-w-6xl'>
            <div className="grid lg:grid-cols-5 gap-16 items-start">
                
                {/* Main Action Section */}
                <div className="lg:col-span-3">
                    <div className='bg-[#0f172a] p-12 lg:p-16 rounded-[3.5rem] shadow-2xl border border-white/5 animate-fade-in'>
                        <h1 className='font-black text-4xl text-white mb-3 tracking-tighter'>Shorten a link</h1>
                        <p className='text-slate-400 mb-12 font-bold text-lg'>Simplify your digital presence instantly.</p>
                        
                        <div className='flex flex-col gap-8'>
                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Destination URL</label>
                                <input type="text"
                                    value={url}
                                    className='px-6 py-5 bg-[#030712] border-2 border-white/5 focus:outline-none focus:border-primary/50 text-white rounded-3xl transition-all font-bold text-lg placeholder:text-slate-700 shadow-inner'
                                    placeholder='https://my-very-long-link.com'
                                    onChange={e => { seturl(e.target.value) }} />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Alias</label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-6 text-slate-700 font-black text-lg italic">bitlinks/</span>
                                    <input type="text"
                                        value={shorturl}
                                        className='w-full pl-24 pr-6 py-5 bg-[#030712] border-2 border-white/5 focus:outline-none focus:border-primary/50 text-white rounded-3xl transition-all font-black text-lg placeholder:text-slate-800 shadow-inner'
                                        placeholder='my-link'
                                        onChange={e => { setshorturl(e.target.value) }} />
                                </div>
                            </div>

                            <button 
                                disabled={loading}
                                onClick={generate} 
                                className={`relative group bg-primary hover:bg-primary/90 text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all overflow-hidden ${loading ? 'opacity-80 active:scale-100' : 'active:scale-95'}`}
                            >
                                <span className={loading ? 'opacity-0' : 'relative z-10 flex items-center justify-center gap-3 tracking-tight'}>
                                    Generate BitLink
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-primary">
                                        <div className="w-8 h-8 border-[5px] border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </button>
                        </div>

                        {generated && (
                            <div className='mt-16 bg-primary/5 border-2 border-primary/10 rounded-[3rem] p-10 animate-fade-in'>
                                <h2 className='font-black text-white text-2xl mb-8 flex items-center gap-4'>
                                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    Link is ready
                                </h2>
                                
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-[#030712] p-4 rounded-[2rem] border-2 border-white/5 shadow-3xl mb-12">
                                    <code className='flex-1 overflow-x-auto text-white font-black px-4 text-xl py-2 selection:bg-primary/40'>
                                        <Link target="_blank" href={generated}>{generated}</Link> 
                                    </code>
                                    <button 
                                        onClick={() => copyToClipboard(generated)}
                                        className={`px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 ${copySuccess ? 'bg-emerald-500 text-white' : 'bg-primary text-white hover:bg-primary/90'}`}
                                    >
                                        {copySuccess ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                                
                                <div className="flex flex-col items-center gap-10">
                                    <div className="text-center group">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-10">Scan Digital Asset</p>
                                        <div className="p-10 bg-white rounded-[2.5rem] shadow-3xl border-b-[12px] border-slate-200 inline-block transition-transform hover:scale-105">
                                            <img 
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generated)}`} 
                                                alt="QR Code" 
                                                className="w-44 h-44"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Items Sidebar */}
                <div className="lg:col-span-2 space-y-12 animate-fade-in delay-200">
                    <div className="flex justify-between items-end border-l-4 border-primary pl-4">
                        <h2 className='font-black text-slate-500 uppercase tracking-[0.3em] text-[10px]'>Activity History</h2>
                        {recentLinks.length > 0 && (
                            <button 
                                onClick={() => {
                                    localStorage.removeItem("recentLinks")
                                    setRecentLinks([])
                                }}
                                className="text-[10px] font-black text-red-500 hover:text-red-400 transition-colors uppercase tracking-[0.1em]"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                    
                    <div className="flex flex-col gap-8">
                        {recentLinks.length === 0 ? (
                            <div className="bg-[#0f172a]/20 p-16 rounded-[3.5rem] border-2 border-white/5 border-dashed flex flex-col items-center justify-center text-center">
                                <p className="text-slate-600 font-black text-xs uppercase tracking-widest leading-loose">No active <br/> history found.</p>
                            </div>
                        ) : (
                            recentLinks.map((item, idx) => (
                                <div key={idx} className="bg-[#0f172a]/40 p-10 rounded-[3rem] border border-white/5 hover:border-white/10 transition-all group overflow-hidden relative shadow-2xl">
                                    {/* Decor line */}
                                    <div className="absolute top-0 left-0 w-2 h-full bg-primary opacity-20" />
                                    
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex-1 truncate pr-6">
                                            <div className="text-[9px] font-black text-secondary tracking-[0.3em] mb-3 uppercase">Optimized Link</div>
                                            <div className="font-black text-2xl text-white truncate tracking-tighter">
                                                <Link target="_blank" href={item.shorturl}>{item.shorturl}</Link>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => copyToClipboard(item.shorturl)}
                                            className="p-4 bg-[#030712] border border-white/5 rounded-2xl shadow-inner hover:scale-110 active:scale-90 transition-all"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="text-xs text-slate-500 font-bold truncate flex items-center gap-3 bg-[#030712]/50 p-3 rounded-xl border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                                        {item.url}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shorten