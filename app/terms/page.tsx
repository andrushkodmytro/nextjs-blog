import styles from './termsOfUse.module.scss';

const TermsOfUse = () => {
  return (
    <div className={styles.termsOfUsePage}>
      <div className={styles.container}>
        <h1>Terms of use</h1>
        <h2>Your Account and Responsibilities</h2>
        <p>
          Your Account and Responsibilities You’re responsible for your use of
          the Services and any content you provide, including compliance with
          applicable laws. Content on the Services may be protected by others’
          intellectual property rights. Please don’t copy, upload, download, or
          share content unless you have the right to do so. Your use of the
          Services must comply with our Rules.
        </p>
        <p>
          You may need to register for an account to access some or all of our
          Services. Help us keep your account protected. Safeguard your password
          to the account, and keep your account information current. We
          recommend that you do not share your password with others.
        </p>
        <p>
          If you’re accepting these Terms and using the Services on behalf of
          someone else (such as another person or entity), you represent that
          you’re authorized to do so, and in that case the words “you” or “your”
          in these Terms include that other person or entity.
        </p>
        <p>To use our Services, you must be at least 13 years old.</p>
        <p>
          If you use the Services to access, collect, or use personal
          information about other WebBlog users (“Personal Information”), you
          agree to do so in compliance with applicable laws. You further agree
          not to sell any Personal Information, where the term “sell” has the
          meaning given to it under applicable laws.
        </p>
        <p>
          For Personal Information you provide to us (e.g. as a Newsletter
          Editor), you represent and warrant that you have lawfully collected
          the Personal Information and that you or a third party has provided
          all required notices and collected all required consents before
          collecting the Personal Information. You further represent and warrant
          that WebBlog’s use of such Personal Information in accordance with the
          purposes for which you provided us the Personal Information will not
          violate, misappropriate or infringe any rights of another (including
          intellectual property rights or privacy rights) and will not cause us
          to violate any applicable laws.
        </p>
        <h2>User Content on the Services</h2>
        <p>
          WebBlog may review your conduct and content for compliance with these
          Terms and our Rules, and reserves the right to remove any violating
          content.
        </p>
        <p>
          WebBlog reserves the right to delete or disable content alleged to be
          infringing the intellectual property rights of others, and to
          terminate accounts of repeat infringers. We respond to notices of
          alleged copyright infringement if they comply with the law; please
          report such notices using our Copyright Policy.
        </p>
        <h2>Termination</h2>
        <p>
          You’re free to stop using our Services at any time. We reserve the
          right to suspend or terminate your access to the Services with or
          without notice.
        </p>
        <h2>Severability</h2>
        <p>
          If any provision or part of a provision of these Terms is unlawful,
          void or unenforceable, that provision or part of the provision is
          deemed severable from these Terms and does not affect the validity and
          enforceability of any remaining provisions.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
