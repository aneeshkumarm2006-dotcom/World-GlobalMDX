'use client';
import { usePathname } from 'next/navigation';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { ViewSection } from '../view-sections/view-sections';
import style from './footer.module.scss';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Create a free form endpoint at https://formspree.io and paste it here
const CONTACT_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export const Footer = ({image}: {image: string}) => {

    const activePath = usePathname();

    const internalRef = useRef<HTMLDivElement | null>(null);
    const sectionRef1 = useRef<HTMLDivElement | null>(null);
    const sectionRef2 = useRef<HTMLDivElement | null>(null);

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', product: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    useEffect(() => {
        animate();
    }, [])

    function animate(){


    }

    async function handleSubmit() {
        setStatus('sending');
        try {
            const res = await fetch(CONTACT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(formData),
            });
            setStatus(res.ok ? 'success' : 'error');
        } catch {
            setStatus('error');
        }
    }

    return <>
        <div id="contact" className="section-footer" ref={internalRef}>
            <ViewSection className={style['form-pre-footer']} ref={sectionRef1} >

                <img className='image-footer hide-sm' src={image} alt="" />
                <div className="form-container">
                    <div className="title">
                        <h1>Get In Touch With WorldGD</h1>
                        <p>Have a question or need assistance? Contact us and our team at WorldGD will get back to you as soon as possible.</p>
                        <span className='hide-sm'>hello@worldgd.com</span>
                    </div>
                    <div className="form-wrapper">
                        {status === 'success' ? (
                            <p className="form-success">Thank you! We&apos;ll be in touch soon.</p>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder='Full name'
                                    value={formData.name}
                                    onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                                />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                                />
                                <input
                                    type="text"
                                    placeholder='Phone number'
                                    value={formData.phone}
                                    onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
                                />
                                <div className="select-wrapper">
                                    <span className='placeholder'>Select bamboo or palms</span>
                                    <select
                                        value={formData.product}
                                        onChange={e => setFormData(d => ({ ...d, product: e.target.value }))}
                                    >
                                        <option value="" disabled hidden></option>
                                        <option value="bamboo">Bamboo</option>
                                        <option value="palms">Palms</option>
                                    </select>
                                </div>
                                <textarea
                                    placeholder='Message'
                                    value={formData.message}
                                    onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                                />
                                {status === 'error' && (
                                    <p className="form-error">Something went wrong. Please try again.</p>
                                )}
                                <Button color={{'color': 'yellow-2', alpha: '100'}} onClick={handleSubmit}>
                                    <span>{status === 'sending' ? 'Sending…' : 'Submit'}</span>
                                    <Button circle color={{color: 'white', alpha: '100'}} >
                                        <Icon icon={'arrow-right-with-tail'} color={{color: 'yellow-2', alpha: '100'}}/>
                                    </Button>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

            </ViewSection>
            <ViewSection className={style.footer} ref={sectionRef2}>
                <div className="links-wrapper">
                    <a className={activePath === '/home' ? 'active' : ''} href="/home">Home</a>
                    <a href="#">About Us</a>
                    <a href="#">Bamboo</a>
                    <a href="#">Palm</a>
                    <a href="#contact">Contact Us</a>
                </div>
                <div className="contact-info">
                    <span>hello@worldgd.com</span>
                    <span>+1 (xxx) xxxx-xxxx</span>
                    <div className="address-wrapper">
                        <span>456 Elm Street, Suite 200</span>
                        <span>New York, NY 10001</span>
                        <span>United States</span>
                    </div>
                    <div className="social-links-wrapper hide-sm">
                        <a href="#">Instagram</a>
                        <a href="#">X</a>
                    </div>
                </div>
                <div className="end-wrapper">
                    <div className="extras-sites">
                        <a href="#">Terms and Conditions</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                    <div className="world-name">
                        <img src="/images/world-name.png" alt="World Global" />
                        <Button circle className='hide-sm'>
                            <Icon color={{color: 'orange', alpha: '100'}} icon={'arrow-up-with-tail'}></Icon>
                        </Button>
                    </div>
                    <span>© All rights reserved 2025.</span>
                </div>
            </ViewSection>
        </div>
    </>
}
