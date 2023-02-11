<script setup lang="ts">
import MediumTitle from "@/components/MediumTitle.vue";
</script>

<template>
  <div class="settings">
    <article>
      <h1>About us</h1>
      <p>
        Merken is an application integrated with the Marked library with the
        goal of bringing greater ease of development of markdowns In other
        words, merken/marked is an official markdown analyzer with such powerful
        features to improve the development experience.
      </p>
      <MediumTitle>What is a Markdown</MediumTitle>
      <p>
        Markdown is a markup language that makes it easy to write content in
        plain text. It was designed to be easy to read and write for everyone,
        including people who aren't programmers. Markdown is popular for writing
        content for the web. It's used by bloggers, programmers, students, and
        anyone else who needs to create HTML or XHTML on the fly.
      </p>
      <p>
        It doesn't matter if you're using a computer or mobile device—markdown
        will work wherever you are.
      </p>
      <MediumTitle>About Marked</MediumTitle>
      <ul>
        <li>build for speed.</li>
        <li>
          a low-level markdown compiler for parsing markdown without caching or
          blocking for long periods of time.
        </li>
        <li>
          light-weight while implementing all markdown features from the
          supported flavors & specifications.
        </li>
      </ul>
      <MediumTitle>Contact</MediumTitle>
      <p>
        E-mail:
        <a href="mailto:oficial.kaikselhorst@gmail.com">
          &lt;oficial.kaikselhorst@gmail.com&gt;
        </a>
      </p>
      <p>
        Github
        <a href="https://github.com/KaikSelhorst/Merken" target="_blank">
          @Project
        </a>
      </p>
      <p>
        Dev:
        <a href="https://github.com/KaikSelhorst" target="_blank">
          @KaikSelhorst
        </a>
      </p>
      <p>
        Discord:
        <a href="https://discord.com/users/690249250067841031" target="_blank">
          Bseven#4712
        </a>
      </p>
    </article>
  </div>
</template>

<style scoped>
li {
  margin-bottom: 12px;
  list-style: square;
  font-size: 1rem;
  line-height: 1.425rem;
  list-style-position: inside;
}
a {
  color: var(--font-color);
  text-decoration: underline;
}
</style>
