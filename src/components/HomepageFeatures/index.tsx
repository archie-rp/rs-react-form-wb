import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Controlled form',
    Svg: require('@site/static/img/controlled.svg').default,
    description: (
      <>
        No need to wrap with Form tag.
      </>
    ),
  },
  {
    title: 'Build in Typescript',
    Svg: require('@site/static/img/build.svg').default,
    description: (
      <>
        Get all the features with autocomplete, error messages, typesafety and more.
      </>
    ),
  },
  {
    title: 'Support for classes',
    Svg: require('@site/static/img/classes.svg').default,
    description: (
      <>
        Possability of <b>classes</b> as default form data.
      </>
    ),
  },
  {
    title: 'Validation by schema',
    Svg: require('@site/static/img/validations.svg').default,
    description: (
      <>
        No native validation. The entire validation is up to the developer.
      </>
    ),
  },
  {
    title: 'Compatiblity with 3rd-party UI libraries',
    Svg: require('@site/static/img/libraries.svg').default,
    description: (
      <>
        Simple to use with existing HTML form inputs and 3rd-party UI libraries.
      </>
    ),
  },
  {
    title: 'Support for reactjs and react-native',
    Svg: require('@site/static/img/web_mobile.svg').default,
    description: (
      <>
        Same library for multiple platforms.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
