import Giscus from "@giscus/react";
import React from 'react'

const Comments  = () => {
  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto my-8">
        <Giscus
          repo="Helina0610/notion-blog_2023"
          repoId="R_kgDOJOcEZQ"
          category="giscus"
          categoryId="DIC_kwDOJOcEZc4Ca6Xu"
          mapping="pathname"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light_protanopia"
          lang="ko"
          loading="lazy"
        />

      </div>
    </section>
  )
}

export default Comments 
