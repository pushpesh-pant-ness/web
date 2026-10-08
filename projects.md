---
layout: single
title: Projects
description: "Selected projects by Pushpesh Gokul Pant spanning Computer Vision, Deep Learning, and NLP."
author_profile: true
permalink: /projects/
---

## Projects

<div class="tag-filter" id="tag-filter" role="group" aria-label="Filter projects by tag">
  <button type="button" class="tag-filter-btn is-active" data-tag="all" aria-pressed="true">All</button>
{%- assign tag_string = "" -%}
{%- for project in site.data.projects -%}
  {%- assign joined_tags = project.tags | join: ',' -%}
  {%- assign tag_string = tag_string | append: joined_tags | append: ',' -%}
{%- endfor -%}
{%- assign all_tags = tag_string | split: ',' | uniq -%}
{%- for tag in all_tags -%}
  <button type="button" class="tag-filter-btn" data-tag="{{ tag }}" aria-pressed="false">{{ tag }}</button>
{%- endfor -%}
</div>

<div id="project-list">
{% for project in site.data.projects %}
<div class="project-card" data-tags="{{ project.tags | join: ',' }}" markdown="1">
{% if project.image and project.image != "" %}
<img class="project-card-image" src="{{ project.image | relative_url }}" alt="{{ project.title }} preview">
{% endif %}
### {{ project.title }}
{{ project.description }}

{% for tag in project.tags %}<span class="tech-tag">{{ tag }}</span>{% endfor %}

<div class="project-links">
{% if project.pdf and project.pdf != "" %}<i class="far fa-file-pdf" aria-hidden="true"></i> [PDF]({{ project.pdf }}){: target="_blank" rel="noopener noreferrer"} &nbsp; &nbsp; {% endif %}{% if project.code and project.code != "" %}<i class="fab fa-github" aria-hidden="true"></i> [Code]({{ project.code }}){: target="_blank" rel="noopener noreferrer"}{% endif %}
</div>
</div>
{% endfor %}
</div>

<p class="no-results-msg" id="no-results-msg" hidden>No projects match that filter.</p>
