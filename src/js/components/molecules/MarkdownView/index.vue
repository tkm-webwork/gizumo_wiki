<template lang="html">
  <div :class="wrapperClasses">
    <div
      :class="classes"
      v-html="marked"
    />
    <template v-if="flex">
      <div
        class="markdown-view__index"
        v-html="markedIndex"
      />
    </template>
  </div>
</template>

<script>
import marked from 'marked';
import hljs from 'highlight.js';

export default {
  props: {
    markdownContent: {
      type: String,
      default: '',
    },
    flex: {
      type: Boolean,
      default: false,
    },
    whiteBg: {
      type: Boolean,
      default: false,
    },
    wide: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    wrapperClasses() {
      return {
        'markdown-view': true,
        'markdown-view--flex': this.flex,
      };
    },
    classes() {
      return {
        'markdown-view__body': true,
        'markdown-view__body--wide': this.wide,
        'markdown-view__body--white-bg': this.whiteBg,
      };
    },
    marked() {
      const renderer = new marked.Renderer();
      renderer.code = (code, lang) => `<pre class="hljs"><code class="language-${lang}">${hljs.highlightAuto(code, [lang]).value}</code></pre>`;
      renderer.em = text => `<span class="attention">${text}</span>`;

      marked.setOptions({
        renderer,
        /* renderer: new marked.Renderer(), */
        highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
        breaks: false,
        smartLists: true,
      });
      return marked(this.markdownContent);
    },
    markedIndex() {
      // TODO: ドキュメントの目次作る
      return marked('目次');
    },
  },
};
</script>

<style lang="scss">
// markdown-view
.markdown-view--flex {
  display: flex;
  align-items: flex-start;
}
// markdown-view__body
.markdown-view__body {
  padding: 10px;
  width: 100%;
  font-size: 16px;
}
.markdown-view__body--wide {
  padding: 10px 30px 50px;
}
.markdown-view__body--white-bg {
  background-color: #fff;
}
// markdown-view__index
.markdown-view__index {
  margin-left: 5%;
  width: 30%;
}

// ---------------------------------------------------
// マークダウンの中身のスタイル
.markdown-view {
  * + pre {
    margin-top: 20px;
  }
  .attention {
    font-weight: $black;
    color: $errorColor;
  }
  pre {
    margin-left: -30px;
    margin-right: -30px;
    padding: 20px 30px;
    font-size: 14px;
    line-height: 1.4;
    border-radius: 3px;
    * {
      font-family: SourceCodePro;
      font-weight: 400;
    }
    & + * {
      margin-top: 20px;
    }
  }
  h1 {
    margin-bottom: 30px;
    padding: 10px 15px;
    font-size: 34px;
    line-height: 1.4;
    border-bottom: 1px solid $keycolor;
    & + h2 {
      margin-top: 0;
    }
  }
  h2 {
    position: relative;
    margin: 30px 0 15px;
    padding: 0 30px;
    font-size: 26px;
    line-height: 1.6;
    border-bottom: 1px solid #e0e0e0;
    &:before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 10px;
      height: 10px;
      border-right: 3px solid #e0e0e0;
      border-bottom: 3px solid #e0e0e0;
      transform: translateY(-50%) rotate(-45deg);
      content: "";
    }
  }
  h3 {
    font-size: 20px;
  }
  h4 {
    font-size: 18px;
  }
  h5 {
    font-size: 16px;
  }
  hr {
    margin: 40px auto;
    width: 90%;
  }
  p {
    & + p,
    & + ul,
    & + ol,
    & + table {
      margin-top: 15px;
    }
    & > code {
      padding: 3px 5px;
      color: #ebdbb2;
      font-family: SourceCodePro;
      font-weight: $normal;
      font-size: 15px;
      background-color: #282828;
      border-radius: 3px;
    }
    strong {
      font-weight: $black;
    }
    a {
      text-decoration: underline;
      color: #00f;
      &:hover {
        text-decoration: none;
      }
    }
  }

  ul {
    list-style: disc;
  }

  ul, ol {
    display: inline-block;
    padding: 10px 20px;
    padding-left: 40px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: #fcfcfc;
    li {
      // display: inline-block;
      // border-bottom: 1px solid #efefef;
      padding: 3px 0;
      line-height: 1.2;
      text-decoration: underline;
    }
    code {
      text-decoration: underline;
    }
    & + p,
    & + ul,
    & + ol,
    & + table {
      margin-top: 15px;
    }
  }

  table {
    th {
      background-color: #ebf6f7;
    }
    td, th {
      border: 1px solid #ccc;
      padding: 5px 20px;
    }
    & + p,
    & + ul,
    & + ol {
      margin-top: 15px;
    }
  }

  table, ul, ol {
    code {
      display: inline-block;
      padding: 1px 5px;
      color: #282828;
      font-family: SourceCodePro;
      font-weight: 400;
      font-size: 15px;
      border-radius: 3px;
      background-color: #f8f4e6;
    }
  }
}
</style>
