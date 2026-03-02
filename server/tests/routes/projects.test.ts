import request from 'supertest';
import app from '../../src/app';

describe('GET /api/projects', () => {
  it('should return 200 with projects array', async () => {
    const res = await request(app).get('/api/projects');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should return projects with correct shape', async () => {
    const res = await request(app).get('/api/projects');
    const project = res.body.data[0];

    expect(project).toHaveProperty('id');
    expect(project).toHaveProperty('title');
    expect(project).toHaveProperty('description');
    expect(project).toHaveProperty('technologies');
    expect(project).toHaveProperty('githubUrl');
    expect(project).toHaveProperty('image');
    expect(project).toHaveProperty('featured');
    expect(project).toHaveProperty('category');
    expect(Array.isArray(project.technologies)).toBe(true);
  });

  it('should have at least one featured project', async () => {
    const res = await request(app).get('/api/projects');
    const featured = res.body.data.filter((p: { featured: boolean }) => p.featured);
    expect(featured.length).toBeGreaterThan(0);
  });
});

describe('GET /api/skills', () => {
  it('should return 200 with skills object', async () => {
    const res = await request(app).get('/api/skills');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('languages');
    expect(res.body.data).toHaveProperty('backend');
    expect(res.body.data).toHaveProperty('databases');
    expect(res.body.data).toHaveProperty('tools');
  });

  it('should return skills with correct shape', async () => {
    const res = await request(app).get('/api/skills');
    const skill = res.body.data.languages[0];

    expect(skill).toHaveProperty('name');
    expect(skill).toHaveProperty('level');
    expect(skill).toHaveProperty('icon');
  });
});

describe('GET /api/experience', () => {
  it('should return 200 with experience array', async () => {
    const res = await request(app).get('/api/experience');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should return experience entries with correct shape', async () => {
    const res = await request(app).get('/api/experience');
    const exp = res.body.data[0];

    expect(exp).toHaveProperty('id');
    expect(exp).toHaveProperty('role');
    expect(exp).toHaveProperty('company');
    expect(exp).toHaveProperty('location');
    expect(exp).toHaveProperty('startDate');
    expect(exp).toHaveProperty('description');
    expect(exp).toHaveProperty('technologies');
    expect(Array.isArray(exp.technologies)).toBe(true);
  });

  it('should have at least one current position', async () => {
    const res = await request(app).get('/api/experience');
    const current = res.body.data.filter((e: { current: boolean }) => e.current);
    expect(current.length).toBeGreaterThan(0);
  });
});
