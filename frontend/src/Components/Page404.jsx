import { useTranslation } from 'react-i18next';
import err from './img/Снимок экрана 2024-08-16 в 17.04.00.png';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <div className="h-100" id="err404">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">{t('logo')}</a>
          </div>
        </nav>
        <div className="text-center">
          <img
            className="img-fluid h-25 rounded-circle"
            style={{ maxHeight: '30vh', maxWidth: '50vh' }}
            src={err}
            alt="Page not found"
          />
          <h1 className="h4 text-muted">
            {t('404.error')}
          </h1>
          <p className="text-muted">
            {t('404.message')}
            <a href="/">{t('404.main')}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page404;
