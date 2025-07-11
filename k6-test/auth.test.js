import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('http://auth.192.168.222.136.nip.io/api/auth/health', {
    headers: {
      // Có thể thêm Authorization nếu cần
    }
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
