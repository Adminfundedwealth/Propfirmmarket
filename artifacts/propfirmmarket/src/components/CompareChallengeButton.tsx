import { Link } from 'wouter';
import { analytics } from '@/lib/analytics';
import { MAX_COMPARE_CHALLENGES, useComparisonSelection } from '@/lib/comparisonSelection';

export function CompareChallengeButton({ challengeId, compact = false }: { challengeId: string; compact?: boolean }) {
  const selection = useComparisonSelection();
  const selected = selection.ids.includes(challengeId);
  const atLimit = !selected && selection.ids.length >= MAX_COMPARE_CHALLENGES;

  function handleClick() {
    if (selected) {
      const remaining = selection.remove(challengeId);
      selection.announce(remaining.includes(challengeId)
        ? 'Comparison selection could not be updated in this browser.'
        : 'Removed from comparison.');
      if (!remaining.includes(challengeId)) {
        analytics.track('compare_remove', {
          challenge_id: challengeId,
          comparison_count: remaining.length,
          source_page: window.location.pathname,
        });
      }
      return;
    }
    const result = selection.add(challengeId);
    if (result === 'added') {
      selection.announce('Added to comparison.');
      analytics.track('compare_add', {
        challenge_id: challengeId,
        comparison_count: selection.ids.length + 1,
        source_page: window.location.pathname,
      });
    }
    else if (result === 'already-added') selection.announce('Already added to comparison.');
    else if (result === 'limit-reached') selection.announce(`Comparison is limited to ${MAX_COMPARE_CHALLENGES} challenges. Remove one to add another.`);
    else if (result === 'storage-error') selection.announce('Comparison selection could not be saved in this browser.');
    else selection.announce('This challenge is no longer available.');
  }

  return (
    <div className={`pf-compare-control${compact ? ' pf-compare-control-compact' : ''}`}>
      <button
        className={selected ? 'btn btn-o' : 'btn btn-g'}
        type="button"
        aria-pressed={selected}
        aria-label={selected ? 'Remove challenge from comparison' : 'Add challenge to comparison'}
        onClick={handleClick}
      >
        {selected ? 'Remove from Compare' : atLimit ? 'Add to Compare · Limit reached' : 'Add to Compare'}
      </button>
      {selected && <span className="pf-compare-selected">Already added</span>}
      {!compact && <span className="pf-compare-count" aria-live="polite">{selection.ids.length}/{MAX_COMPARE_CHALLENGES} selected</span>}
      {!compact && selection.ids.length > 0 && <Link className="pf-compare-link" href="/compare">Compare selected</Link>}
      {!compact && <span className="pf-compare-feedback" role="status" aria-live="polite">{selection.message}</span>}
    </div>
  );
}
