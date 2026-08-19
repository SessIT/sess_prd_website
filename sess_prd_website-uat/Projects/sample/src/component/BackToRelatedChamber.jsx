import { ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getChamberNameFromPath } from '../data/relatedChambers';

export default function BackToRelatedChamber() {
  const location = useLocation();
  const sourcePath = location.state?.from;

  if (!sourcePath) return null;

  return (
    <div className="mt-10 flex justify-center">
      <Link to={sourcePath} className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-700">
        <ChevronLeft size={16} />
        Back to {getChamberNameFromPath(sourcePath)}
      </Link>
    </div>
  );
}
