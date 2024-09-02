import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>
        {t('404.error')}
      </h1>
      <h3>
        {t('404.message')}
      </h3>
    </>
  );
};

export default Page404;
