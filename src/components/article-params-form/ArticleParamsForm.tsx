import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ParamsProps {
	setPageStyle: (pageStyle: ArticleStateType) => void;
}
const headingStyles = {
	fontFamily: 'var(--font-family, "Open Sans")',
	fontWeight: '800',
	fontSize: '31px',
	textTransform: 'uppercase',
	textAlign: 'left',
	color: '#000',
	marginBlockEnd: '50px',
} as React.CSSProperties;

export const ArticleParamsForm = ({ setPageStyle }: ParamsProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [form, setForm] = useState(defaultArticleState);
	const articleRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: setIsMenuOpen,
		rootRef: articleRef,
	});

	function handleReset() {
		setPageStyle(defaultArticleState);
		setForm(defaultArticleState);
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setPageStyle(form);
	}

	function handleChange(key: keyof typeof form) {
		return function (value: OptionType) {
			setForm((prev) => ({
				...prev,
				[key]: value,
			}));
		};
	}

	function handleClick() {
		setIsMenuOpen((prev) => !prev);
	}

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleClick} />
			<aside
				ref={articleRef}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 style={headingStyles}>Задайте параметры</h2>
					<section className={styles.settingsSection}>
						<Select
							title={'Шрифт'}
							selected={form.fontFamilyOption}
							onChange={handleChange('fontFamilyOption')}
							options={fontFamilyOptions}></Select>
						<RadioGroup
							name={'fontSize'}
							options={fontSizeOptions}
							selected={form.fontSizeOption}
							onChange={handleChange('fontSizeOption')}
							title={'Размер шрифта'}></RadioGroup>
						<Select
							title={'Цвет шрифта'}
							selected={form.fontColor}
							onChange={handleChange('fontColor')}
							options={fontColors}></Select>
						<Separator></Separator>
						<Select
							title={'Цвет фона'}
							selected={form.backgroundColor}
							onChange={handleChange('backgroundColor')}
							options={backgroundColors}></Select>
						<Select
							title={'Ширина контента'}
							selected={form.contentWidth}
							onChange={handleChange('contentWidth')}
							options={contentWidthArr}></Select>
					</section>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
