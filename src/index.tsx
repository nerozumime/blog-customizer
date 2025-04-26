import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [pageStyle, setPageStyle] = useState(defaultArticleState);
	const [form, setForm] = useState(defaultArticleState);

	function handleClick() {
		setIsOpen((prev) => !prev);
	}
	function handleReset() {
		setPageStyle(defaultArticleState);
		setForm(defaultArticleState);
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setPageStyle(form);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageStyle.fontFamilyOption.value,
					'--font-size': pageStyle.fontSizeOption.value,
					'--font-color': pageStyle.fontColor.value,
					'--container-width': pageStyle.contentWidth.value,
					'--bg-color': pageStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				onClick={handleClick}
				form={form}
				setForm={setForm}
				onReset={handleReset}
				onSubmit={handleSubmit}></ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
