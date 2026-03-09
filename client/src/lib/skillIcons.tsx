import {
  SiJavascript,
  SiTypescript,
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
  SiDocker,
  SiTailwindcss,
  SiJest,
  SiRedis,
  SiLinux,
} from 'react-icons/si';
import {
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
  sql: HiDatabase,
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
  docker: SiDocker,
  tailwind: SiTailwindcss,
  jest: SiJest,
  redis: SiRedis,
  linux: SiLinux,
};

const iconColors: Record<string, string> = {
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  sql: '#336791',
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
  docker: '#2496ED',
  tailwind: '#06B6D4',
  jest: '#C21325',
  redis: '#DC382D',
  linux: '#FCC624',
};

export function getSkillIcon(iconKey: string): React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }> | null {
  return iconMap[iconKey] || null;
}

export function getSkillIconColor(iconKey: string): string | undefined {
  return iconColors[iconKey];
}
