export function authMiddleware(req: any, res: any, next: any) {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // Here you would typically verify the token
  // For example, using a library like jsonwebtoken
  // jwt.verify(token, secret, (err, decoded) => {
  //     if (err) {
  //         return res.status(403).json({ message: 'Forbidden' });
  //     }
  //     req.user = decoded;
  //     next();
  // });

  // For now, we'll just call next() to proceed
  next()
}
