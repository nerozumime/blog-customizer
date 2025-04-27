import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';

import styles from './App.module.scss';
import { defaultArticleState } from 'src/constants/articleProps';

export default function App() {
	const [pageStyle, setPageStyle] = useState(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageStyle.fontFamilyOption.value,
					'--font-size': pageStyle.fontSizeOption.value,
					'--font-color': pageStyle.fontColor.value,
					'--container-width': pageStyle.contentWidth.value,
					'--bg-color': pageStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setPageStyle={setPageStyle}></ArticleParamsForm>
			<Article />
		</main>
	);
}
