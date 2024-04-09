import ghpages from 'gh-pages'

ghpages.publish('dist', {}, function (err) {
  }
).then(r => {
  console.log('gh-pages 部署成功')
});
