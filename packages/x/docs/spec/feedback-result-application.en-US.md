---
group:
  title: 💻 Hybrid UI 混合界面设计
  order: 4
order: 7
title: 反馈｜结果应用
---

![](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*LGETTJIfYe0AAAAAAAAAAAAADgCCAQ/fmt.webp)

在 AI 呈现生成结果后，需要为用户提供对 AI 生成内容的快捷操作能力，包括复制、重新生成、反馈等基础功能，帮助用户高效使用和处理内容。

## 设计目标

结果应用组件需要结合实际场景，提供必要且便捷的内容处理能力。通过合理的操作项布局和及时的状态反馈，让用户能够轻松地使用和管理 AI 生成的内容，提升整体交互体验和效率。

---

## 基础操作

### 复制

<ImagePreview>
<img class="preview-img no-padding" src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*QOSfTLjK1kEAAAAAAAAAAAAADgCCAQ/fmt.webp">
</ImagePreview>

最常用的内容应用方式。点击后立即将 AI 生成的内容复制到剪切板，同时图标切换为完成状态给予反馈。复制范围包括文本、代码等可复制内容，要保证格式完整性。

### 重新生成

<ImagePreview>
<img class="preview-img no-padding" src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*_5uNR7dvpAAAAAAAAAAAAAAADgCCAQ/fmt.webp">
</ImagePreview>

用于优化或改进当前结果。点击触发 AI 重新生成请求，支持多个版本结果的切换对比。新生成的内容要在界面中平滑切换，保持良好的过渡体验。

### 反馈

<ImagePreview>
<img class="preview-img no-padding" src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*i1aMRKn7WLEAAAAAAAAAAAAADgCCAQ/fmt.webp">
</ImagePreview>

<ImagePreview>
<img class="preview-img no-padding" src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*Am8ARrPiHhYAAAAAAAAAAAAADgCCAQ/fmt.webp">
</ImagePreview>

通过点赞/点踩收集用户对内容的评价。操作后图标立即反映选择状态，清晰展示用户的评价结果。在特定场景下，可通过弹窗收集具体反馈，提供快捷选项的同时保留自由输入的方式。

### 删除

<ImagePreview>
<img class="preview-img no-padding" src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*C_PTQIUXkL8AAAAAAAAAAAAADgCCAQ/fmt.webp">
</ImagePreview>

用于移除不需要的回答内容。考虑到操作的不可逆性，使用警示色提醒，并设置二次确认机制避免误操作。确认删除后要平滑移除内容。

### 朗读

<ImagePreview>
<img class="preview-img no-padding" src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*gG4nQZZOQYoAAAAAAAAAAAAADgCCAQ/fmt.webp">
</ImagePreview>

将文本转换为语音输出。点击开始播放，再次点击停止。

### 引用

<ImagePreview>
<img class="preview-img no-padding" src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*GUaJQrP0sqQAAAAAAAAAAAAADgCCAQ/fmt.webp">
</ImagePreview>

快速将 AI 回答作为新对话的引用内容。点击后自动填充到输入区域，方便用户基于已有回答继续对话。引用要保持原文格式，确保上下文的连贯性。

<br/>
