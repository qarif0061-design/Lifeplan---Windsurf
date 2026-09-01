type LogoProps = { className?: string; variant?: "horizontal" | "stacked" };

/** Full Lifeplans wordmark lockup. Swaps light/dark asset automatically with the theme. */
const Logo = ({ className = "", variant = "horizontal" }: LogoProps) => (
  <>
    <img
      src={`/brand/lifeplans_logo_${variant}_light.png`}
      alt="Lifeplans"
      className={`block dark:hidden ${className}`}
    />
    <img
      src={`/brand/lifeplans_logo_${variant}_dark.png`}
      alt="Lifeplans"
      className={`hidden dark:block ${className}`}
    />
  </>
);

export default Logo;
