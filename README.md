# webpack-test

Repository to illustrate a bug where Webpack gets stuck at compiling.

Steps to reproduce:

```
npm i
npm run webpack-dev
```

The issue is somehow related to the image being referenced in the `style.scss`
file.

Deleting the image or renaming it, fixes the issue.
Setting `url: false` in the `css-loader` inside webpack.common.js, also fixes the
issue


