import React from 'react';
import texts from './locales/RU';
import {
  ABOUT_US_TITLE,
  ABOUT_US_URL,
  AFISHA_TITLE,
  AFISHA_URL,
  PLACES_TITLE,
  PLACES_URL,
  QUESTIONS_TITLE,
  QUESTIONS_URL,
  READ_AND_WATCH_TITLE,
  READ_AND_WATCH_URL,
  RIGHTS_TITLE,
  RIGHTS_URL,
  STORIES_TITLE,
  STORIES_URL,
} from '../../config/routes';
import { socialLinks } from '../../utils/external-links';
import { Logo, NavItem } from '../utils';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <a
        href={texts.logoLink}
        className="footer__logo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Logo isWhite sectionClass="footer__logo-image" />
      </a>
      <a
        className="button footer__button"
        href={texts.helpButtonLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {texts.helpButtonText}
      </a>
      <div className="footer__column footer__column_content_concept">
        <p className="footer__brand">{texts.copyright}</p>
        <div className="footer__copyright">
          <p className="footer__authors">
            {texts.devText}
            <a
              href={texts.devLink}
              className="footer__production"
              target="_blank"
              rel="noreferrer"
            >
              {texts.devOrg}
            </a>
          </p>
          <p className="footer__design">
            {texts.designText}
            <a
              href={texts.designLink}
              className="footer__production"
              target="_blank"
              rel="noreferrer"
            >
              {texts.designOrg}
            </a>
          </p>
        </div>
      </div>
      <div className="footer__column footer__column_content_info">
        <ul className="footer__column-list">
          <NavItem
            sectionWrapperClass="footer__column-links"
            sectionLinkClass="footer__column-link"
            href={ABOUT_US_URL}
            linkText={ABOUT_US_TITLE}
          />
          <NavItem
            sectionWrapperClass="footer__column-links"
            sectionLinkClass="footer__column-link"
            href={AFISHA_URL}
            linkText={AFISHA_TITLE}
          />
          <NavItem
            sectionWrapperClass="footer__column-links"
            sectionLinkClass="footer__column-link"
            href={PLACES_URL}
            linkText={PLACES_TITLE}
          />
          <NavItem
            sectionWrapperClass="footer__column-links"
            sectionLinkClass="footer__column-link"
            href={QUESTIONS_URL}
            linkText={QUESTIONS_TITLE}
          />
          <NavItem
            sectionWrapperClass="footer__column-links"
            sectionLinkClass="footer__column-link"
            href={READ_AND_WATCH_URL}
            linkText={READ_AND_WATCH_TITLE}
          />
          <NavItem
            sectionWrapperClass="footer__column-links"
            sectionLinkClass="footer__column-link"
            href={RIGHTS_URL}
            linkText={RIGHTS_TITLE}
          />
          <NavItem
            sectionWrapperClass="footer__column-links"
            sectionLinkClass="footer__column-link"
            href={STORIES_URL}
            linkText={STORIES_TITLE}
          />
        </ul>
      </div>
      <div className="footer__column footer__column_content_social">
        <ul className="footer__column-list">
          {React.Children.toArray(
            socialLinks.map((link) => (
              <li className="footer__column-links">
                <a
                  className="footer__column-link"
                  href={link.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.title}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
