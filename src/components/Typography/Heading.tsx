import { Heading as ThemeHeading, HeadingProps } from 'theme-ui';

interface Props extends HeadingProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

// HOC  using Theme UI heading
export const Heading: React.FC<Props> = ({ children, as, ...rest }) => {
  return (
    <ThemeHeading variant='heading' as={as || 'h1'} {...rest}>
      {children}
    </ThemeHeading>
  );
};
