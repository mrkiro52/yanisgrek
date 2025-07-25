// app/remontDvs/[slug]/page.jsx
import fs from 'fs/promises';
import path from 'path';
import './remontDvsSpecial.scss';
import Header from '@/components/Header/Header';
import Contacts from '@/app/contacts/page';

// ISR: пересобираем страницу раз в минуту
export const revalidate = 60;

// Генерация путей для статической сборки
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src', 'data', 'dvs');
  const files = await fs.readdir(dir);
  return files
    .filter(f => f.endsWith('.json'))
    .map(f => ({ slug: f.replace(/\.json$/, '') }));
}

export default async function RemontDvsPage({ params }) {
  const { slug } = params;

  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'dvs',
    `${slug}.json`
  );

  const fileRaw = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileRaw);

  return (
    <div className="RemontDvsSpecial">
      <Header/>
      <div className="wrapper">
        <h1>Ремонт ДВС<br/>{data.name}</h1>
        <div className="row">
            <div className="block">
                <h2>Слабые места {data.name}</h2>
                <p>{data.slabie_mesta}</p>
            </div>
            <div className="block">
                <h2>Как обслуживать {data.name}</h2>
                <p>{data.kak_obslujivat}</p>
            </div>
        </div>
        <div className="row">
            <div className="block">
                <h2>Как ремонтировать {data.name}</h2>
                <p>{data.kak_remontirovat}</p>
            </div>
            <div className="block">
                <h2>как увеличить срок службы {data.name}</h2>
                <p>{data.kak_uvelichit_srok_slujby}</p>
            </div>
        </div>
      </div>
      <Contacts showHeader={false} />
    </div>
  );
}
