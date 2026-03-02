import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiNginx,
  SiPostman,
  SiSwagger,
  SiReact,
  SiGithubactions,
  SiJsonwebtokens,
} from 'react-icons/si';
import {
  HiCode,
  HiGlobeAlt,
  HiCube,
  HiCreditCard,
  HiLightningBolt,
  HiDatabase,
  HiCloud,
  HiServer,
} from 'react-icons/hi';
import { FaAws } from 'react-icons/fa';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  html: SiHtml5,
  css: SiCss3,
  ejs: HiCode,
  nodejs: SiNodedotjs,
  express: SiExpress,
  nestjs: SiNestjs,
  api: HiGlobeAlt,
  microservices: HiCube,
  jwt: SiJsonwebtokens,
  paystack: HiCreditCard,
  websocket: HiLightningBolt,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  prisma: SiPrisma,
  typeorm: HiDatabase,
  mongoose: SiMongodb,
  git: SiGit,
  aws: FaAws,
  azure: HiCloud,
  pm2: HiServer,
  nginx: SiNginx,
  postman: SiPostman,
  cicd: SiGithubactions,
  swagger: SiSwagger,
  react: SiReact,
};

const iconColors: Record<string, string> = {
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  html: '#E34F26',
  css: '#1572B6',
  nodejs: '#339933',
  express: '#FFFFFF',
  nestjs: '#E0234E',
  postgresql: '#4169E1',
  mongodb: '#47A248',
  prisma: '#2D3748',
  git: '#F05032',
  aws: '#FF9900',
  nginx: '#009639',
  postman: '#FF6C37',
  swagger: '#85EA2D',
  react: '#61DAFB',
  cicd: '#2088FF',
  jwt: '#FB015B',
};

export function getSkillIcon(iconKey: string): React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }> | null {
  return iconMap[iconKey] || null;
}

export function getSkillIconColor(iconKey: string): string | undefined {
  return iconColors[iconKey];
}
