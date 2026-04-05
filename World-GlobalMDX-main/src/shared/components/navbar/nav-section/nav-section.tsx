import { usePathname } from 'next/navigation';
import { Icon } from '../../icon/icon';
import style from './nav-section.module.scss';

export const NavSection = ({ openState }: { openState: boolean }) => {

    const path = usePathname();

    return (
        <div className={`${style['nav-section']} nav-section ${openState ? 'open' : ''}`}>
            <a className={`${path === '/home' ? 'active' : ''}`} href="/home">Home</a>
            <div className="product-item">
                <div className="product-label">
                    <span>Product</span>
                    <Icon icon={'arrow-down'} />
                </div>
                <div className="product-wrapper">
                    <a href="#">Palm</a>
                    <a href="#">Synthetic Bamboo</a>
                </div>
            </div>
            <a href="#">About Us</a>
            <a className="hide-min-md" href="#">Technology</a>
            <a className="hide-min-md" href="#contact">Contact Us</a>
            <div className="extra-sites hide-min-md">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Conditions</a>
            </div>
        </div>
    );
};
