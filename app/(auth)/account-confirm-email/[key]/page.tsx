import { Suspense } from 'react';
import ConfirmEmailByURL from '@/features/authentication/components/account-confirm-email'
import { Loader } from 'lucide-react';

export default async function ConfirmEmailAccount({ params }: { params: { key: string } }) {
    return<Suspense fallback={<Loader />}><ConfirmEmailByURL params={params}/></Suspense>
}