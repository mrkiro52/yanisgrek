// app/remontDvs/[slug]/page.jsx
import fs from 'fs/promises';
import path from 'path';
import './remontAkppSpecial.scss';
import Header from '@/components/Header/Header';
import Contacts from '@/app/contacts/page';

// ISR: пересобираем страницу раз в минуту
export const revalidate = 60;

// Генерация путей для статической сборки
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src', 'data', 'akpp');
  const files = await fs.readdir(dir);
  return files
    .filter(f => f.endsWith('.json'))
    .map(f => ({ slug: f.replace(/\.json$/, '') }));
}

export default async function RemontAkppSpecial({ params }) {
  const { slug } = params;

  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'akpp',
    `${slug}.json`
  );

  const fileRaw = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileRaw);

  return (
    <div className="RemontAkppSpecial">
      <Header/>
      <div className="wrapper">
        <h1>Ремонт КПП<br/>{slug}</h1>
        <div className="row">
            <div className="block">
                <h2>Слабые места {slug}</h2>
                <p>{data.slabie_mesta}</p>
            </div>
            <div className="block">
                <h2>Как обслуживать {slug}</h2>
                <p>{data.kak_obslujivat}</p>
            </div>
        </div>
        <div className="row">
            <div className="block">
                <h2>Как ремонтировать {slug}</h2>
                <p>{data.kak_remontirovat}</p>
            </div>
            <div className="block">
                <h2>как увеличить срок службы {slug}</h2>
                <p>{data.kak_uvelichit_srok_slujby}</p>
            </div>
        </div>
      </div>
      <Contacts showHeader={false} />
    </div>
  );
}
