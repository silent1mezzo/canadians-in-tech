import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { AppConfig } from '@/utils/AppConfig';

const { title } = AppConfig;
const { description } = AppConfig;

export async function GET(context) {
  const people = await getCollection('people');
  return rss({
    title,
    description,
    site: context.site,
    items: people.map((person) => ({
      title: person.data.name,
      description: person.data.description,
      pubDate: Date()
    })),
  });
}