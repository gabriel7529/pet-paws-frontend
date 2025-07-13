import { useTranslation } from 'react-i18next';
function Home() {

  const { t } = useTranslation();

  return (
      <section>
          <h2 className="text-3xl font-bold underline">{t("helloWorld")}</h2>
          <hr/>
          <p>{t("comingSoon")}</p>
      </section>
  )
}

export default Home;
