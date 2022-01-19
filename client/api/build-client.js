import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // Means we are on the server!!! -- namespace route
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      // this acts like a proxy of sorts and will solve the host problems aswell as the cookie issues
      headers: req.headers,
    });
  } else {
    // If window is defined, then we are in the browser -- so relative path to route
    return axios.create({
      baseURL: '/',
    });
  }
};

// 'https:NameOfService.Namespace.svc.cluster.local/PATH -- General formula
// 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser'

export default buildClient;
