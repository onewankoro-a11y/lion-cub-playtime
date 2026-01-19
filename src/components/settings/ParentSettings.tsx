import { useParentalControl } from '@/hooks/useParentalControl';
import { useProgress } from '@/hooks/useProgress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Clock, Trash2 } from 'lucide-react';

interface ParentSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ParentSettings = ({ open, onOpenChange }: ParentSettingsProps) => {
  const { settings, updateSettings } = useParentalControl();
  const { resetProgress } = useProgress();

  const handleTimeLimitChange = (value: number[]) => {
    updateSettings({ dailyTimeLimit: value[0] });
  };

  const handleResetProgress = () => {
    if (confirm('本当に進捗をリセットしますか？')) {
      resetProgress();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl flex items-center justify-center gap-2">
            🛡️ 保護者メニュー
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Time Limit */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base flex items-center gap-2">
                <Clock className="w-5 h-5" />
                1日の利用時間制限
              </Label>
              <Switch
                checked={settings.isTimeLimitEnabled}
                onCheckedChange={(checked) =>
                  updateSettings({ isTimeLimitEnabled: checked })
                }
              />
            </div>

            {settings.isTimeLimitEnabled && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>制限時間</span>
                  <span>{settings.dailyTimeLimit}分</span>
                </div>
                <Slider
                  value={[settings.dailyTimeLimit]}
                  min={5}
                  max={120}
                  step={5}
                  onValueChange={handleTimeLimitChange}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  今日の使用時間: {settings.todayUsage}分
                </div>
              </div>
            )}
          </div>

          {/* Reset Progress */}
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              className="w-full text-destructive hover:text-destructive"
              onClick={handleResetProgress}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              進捗をリセット
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
