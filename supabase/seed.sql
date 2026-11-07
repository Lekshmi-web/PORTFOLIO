-- ════════════════════════════════════════════════════════════
--  Starter content. Run AFTER migrations/0001_init.sql.
--  Safe to re-run: it only fills empty tables.
--  Rows marked is_sample = true are placeholders: edit or delete
--  them in the admin panel. Real items are is_sample = false.
-- ════════════════════════════════════════════════════════════

insert into public.site_settings (
  id, full_name, roles, hero_headline, hero_intro, about_short, about_long,
  core_message, github_url
) values (
  1,
  'Lekshmi R',
  array['AI Engineer','Technical Mentor','Educator','Content Creator','Lifelong Learner'],
  'Building with AI. Sharing Knowledge. Inspiring Engineers.',
  'I design practical artificial intelligence systems, conduct intensive hands-on workshops, and mentor engineering students and tech professionals to build, innovate, and lead.',
  'I am Lekshmi R, an AI Engineer, Technical Mentor, Educator and Content Creator passionate about building practical AI solutions and making technology easier for everyone to understand.',
  E'I work at the intersection of Artificial Intelligence, software development, education and community learning. I enjoy developing real-world projects, teaching students through hands-on workshops, mentoring aspiring engineers, and sharing knowledge through digital content.\n\nMy goal is to make AI accessible, practical and useful — not just something people learn theoretically, but something they can actually build and apply.',
  'I build AI. I teach technology. I inspire people to create.',
  'https://github.com/Lekshmi-web'
) on conflict (id) do nothing;

insert into public.explore_categories (number, title, description, image_url, href, sort_order)
select * from (values
  ('01','AI & Engineering','AI projects, machine learning, LLMs, automation, and practical engineering solutions.','/samples/explore-ai.svg','/projects',1),
  ('02','Teaching & Mentoring','Workshops, technical training, student mentoring, and knowledge sharing.','/samples/explore-teaching.svg','/workshops',2),
  ('03','Speaking & Events','Speaking engagements, events, achievements, and professional experiences.','/samples/explore-speaking.svg','/achievements',3),
  ('04','Content Creator','Educational content, useful AI tools, tutorials, and learning resources.','/samples/explore-content.svg','/content',4)
) as v(number, title, description, image_url, href, sort_order)
where not exists (select 1 from public.explore_categories);

insert into public.projects (slug, title, summary, tech, image_url, repo_url, featured, sort_order) values
  ('ai-interview-platform','AI Interview Platform','An AI-powered interview platform built with Django.', array['Django','Python','AI'], '/samples/project-1.svg','https://github.com/Lekshmi-web/AI-INTERVIEW-PLATFORM-DJANGO-', true, 1),
  ('hirely-job-platform','Hirely','A job platform connecting candidates and employers.', '{}', '/samples/project-2.svg','https://github.com/Lekshmi-web/Hirely-Job-Platform', true, 2),
  ('agrismart-platform','AgriSmart','A smart agriculture platform.', '{}', '/samples/project-3.svg','https://github.com/Lekshmi-web/AgriSmart-Platform', true, 3),
  ('telecom-churn-dashboard','Indian Telecom Churn Analytics','A customer churn analytics dashboard for Indian telecom data.', array['Data Analytics'], '/samples/project-4.svg','https://github.com/Lekshmi-web/Indian-Telecom-Customer-Churn-Analytics-Dashboard', true, 4)
on conflict (slug) do nothing;

insert into public.achievements (title, description, kind, organisation, featured, sort_order, is_sample)
select * from (values
  ('First Rank Holder — Bachelor''s in Data Science','Ranked first in the Bachelor''s in Data Science programme.','Award','University of Kerala', true, 1, false),
  ('Sample: Speaking engagement','Placeholder — add real talks and events here.','Speaking', null, true, 2, true),
  ('Sample: Event or milestone','Placeholder — add real milestones here.','Event', null, true, 3, true)
) as v(title, description, kind, organisation, featured, sort_order, is_sample)
where not exists (select 1 from public.achievements);

insert into public.workshops (slug, title, summary, audience, format, topics, image_url, featured, sort_order, is_sample) values
  ('sample-hands-on-genai','Sample: Hands-on Generative AI','Sample workshop — replace with a real one.','Engineering students','Hands-on', array['LLMs','Prompting','Building apps'],'/samples/workshop-1.svg', true, 1, true),
  ('sample-python-for-ai','Sample: Python for AI','Sample workshop — replace with a real one.','Beginners','Bootcamp', array['Python','Data','ML basics'],'/samples/workshop-2.svg', true, 2, true),
  ('sample-mentoring-circle','Sample: Project Mentoring Circle','Sample programme — replace with a real one.','Final-year students','Mentoring', array['Project guidance','Career'],'/samples/workshop-3.svg', true, 3, true)
on conflict (slug) do nothing;

insert into public.resources (title, description, kind, url, featured, sort_order, is_sample)
select * from (values
  ('Sample: Python Notes','Placeholder — edit with your real description.','Notes','https://github.com/Lekshmi-web/Python-Notes', true, 1, true),
  ('Sample: Deep Learning Notes','Placeholder — edit with your real description.','Notes','https://github.com/Lekshmi-web/Deep-Learning-Notes', true, 2, true),
  ('Sample: Data Analytics Datasets','Placeholder — edit with your real description.','Datasets','https://github.com/Lekshmi-web/Data-Analytics-Projects-Datasets', true, 3, true)
) as v(title, description, kind, url, featured, sort_order, is_sample)
where not exists (select 1 from public.resources);

insert into public.content_items (title, summary, platform, featured, sort_order, is_sample)
select * from (values
  ('Sample video title','Sample content — add your real videos and posts.','YouTube', true, 1, true),
  ('Sample article title','Sample content — add your real articles.','Article', true, 2, true),
  ('Sample post title','Sample content — add your real posts.','LinkedIn', true, 3, true)
) as v(title, summary, platform, featured, sort_order, is_sample)
where not exists (select 1 from public.content_items);

insert into public.testimonials (quote, name, role, featured, sort_order, is_sample)
select * from (values
  ('Sample testimonial — replace with real feedback from a student.','Sample name','Student', true, 1, true),
  ('Sample testimonial — replace with real feedback from a collaborator.','Sample name','Collaborator', true, 2, true)
) as v(quote, name, role, featured, sort_order, is_sample)
where not exists (select 1 from public.testimonials);
