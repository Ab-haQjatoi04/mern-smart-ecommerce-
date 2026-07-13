function buildVocabulary(products) {
  const vocab = new Set();
  products.forEach(p => {
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach(tag => vocab.add(tag.toLowerCase().trim()));
    }
  });
  return Array.from(vocab);
}

function productToVector(product, vocabulary) {
  const vector = new Array(vocabulary.length).fill(0);
  if (product.tags && Array.isArray(product.tags)) {
    product.tags.forEach(tag => {
      const index = vocabulary.indexOf(tag.toLowerCase().trim());
      if (index !== -1) vector[index] += 1;
    });
  }
  return vector;
}

function calculateCosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] ** 2;
    normB += vecB[i] ** 2;
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function getRecommendations(targetProduct, allProducts, limit = 4) {
  const vocabulary = buildVocabulary(allProducts);
  const targetVector = productToVector(targetProduct, vocabulary);
  
  const scoredProducts = allProducts
    .filter(p => p._id.toString() !== targetProduct._id.toString())
    .map(product => {
      const currentVector = productToVector(product, vocabulary);
      const similarity = calculateCosineSimilarity(targetVector, currentVector);
      return { product, similarity };
    });
    
  scoredProducts.sort((a, b) => b.similarity - a.similarity);
  return scoredProducts.slice(0, limit).map(item => item.product);
}

module.exports = { getRecommendations };