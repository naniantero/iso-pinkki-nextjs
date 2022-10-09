import React from 'react';
import { Box, Image, Link } from 'theme-ui';

interface Props {}

type ServiceName = 'facebook' | 'instagram' | 'bandcamp';
interface FooterLinkProps {
  name: ServiceName;
  href: string;
}

const styles: SxStyleProp = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'primary',
    width: '100%',
    alignItems: 'center',
  },
  link: {
    color: 'white',
  },
  serviceLinkContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  serviceIcon: {
    width: 36,
  },
};

const FooterLink: React.FC<FooterLinkProps> = ({ name, href }) => {
  return (
    <a href={href}>
      <Image src={`/icons/${name}.svg`} alt={name} sx={styles.serviceIcon} />
    </a>
  );
};

export const Footer: React.FC<Props> = () => {
  const serviceLinks = [
    {
      id: 'facebook',
      href: 'https://www.facebook.com/isopinkki/',
    },
    {
      id: 'bandcamp',
      href: 'https://isopinkki.bandcamp.com/',
    },
    {
      id: 'instagram',
      href: 'https://www.instagram.com/isopinkki/',
    },
  ] as { id: ServiceName; href: string }[];

  return (
    <Box className='layout__footer' as='footer' sx={styles.container} p={3}>
      <Box sx={styles.serviceLinkContainer} mb={2}>
        {serviceLinks.map(({ id, href }) => (
          <FooterLink name={id} key={id} href={href} />
        ))}
      </Box>
      <Link sx={styles.link} href='mailto:isopinkki@gmail.com'>
        isopinkki@gmail.com
      </Link>
    </Box>
  );
};
